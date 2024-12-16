import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Library untuk membuat token unik
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kreatorId, subscriberEmail, transaksiId } = body;

    if (!kreatorId || !subscriberEmail || !transaksiId) {
      console.error("Session storage data:", {
        kreatorId,
        subscriberEmail,
        transaksiId,
      });
      throw new Error(
        "Data tidak lengkap. Pastikan semua data tersedia di sessionStorage."
      );
    }

    // Validasi keberadaan kreator berdasarkan email
    const kreator = await prisma.kreator.findUnique({
      where: { id: kreatorId },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan." },
        { status: 404 }
      );
    }

    // Validasi keberadaan subscriber berdasarkan email
    const subscriber = await prisma.subscriber.findUnique({
      where: { email: subscriberEmail },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber tidak ditemukan." },
        { status: 404 }
      );
    }

    // Validasi keberadaan transaksi
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: transaksiId },
    });

    if (!transaksi) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    // Generate kode subscription unik
    const kodeSubscription = uuidv4();

    // Simpan data subscription ke database
    const newSubscription = await prisma.subscription.create({
      data: {
        kodeSubscription,
        statusSubscription: "aktif",
        kreatorId: kreator.id,
        subscriberId: subscriber.id,
        transaksiId: transaksi.id,
      },
    });

    return NextResponse.json(
      {
        message: "Subscription berhasil dibuat.",
        subscription: newSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

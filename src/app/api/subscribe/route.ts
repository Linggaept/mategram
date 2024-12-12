import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    // Ambil data dari body request
    const body = await req.json();
    const { email } = body;

    // Validasi email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email tidak valid." },
        { status: 400 }
      );
    }

    // Periksa apakah email sudah ada di database
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      // Jika email sudah ada, tetap lanjutkan ke PaymentModal
      return NextResponse.json(
        { message: "Subscriber sudah ada, lanjutkan ke pembayaran." },
        { status: 200 }
      );
    }

    // Tambahkan subscriber baru
    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      {
        message: "Subscriber berhasil ditambahkan.",
        subscriber: newSubscriber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error menambahkan subscriber:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}

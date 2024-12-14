import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { snap } from "../../../../utils/configs/payment";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, kreatorId, amount } = body;

    if (!email || !kreatorId || !amount) {
      return NextResponse.json(
        { error: "Data tidak lengkap." },
        { status: 400 }
      );
    }

    // Cari subscriber berdasarkan email
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber tidak ditemukan." },
        { status: 404 }
      );
    }

    // Periksa apakah kreator ada
    const kreator = await prisma.kreator.findUnique({
      where: { id: kreatorId },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan." },
        { status: 404 }
      );
    }

    // Buat transaksi di Midtrans
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: `order-${Date.now()}`, // ID transaksi unik
        gross_amount: amount, // Total biaya
      },
      customer_details: {
        email: email,
      },
    });

    // Membuat entri transaksi di database
    const newTransaction = await prisma.transaksi.create({
      data: {
        id: transaction.order_id,
        totalTransaksi: amount,
        statusTransaksi: "pending", // Status transaksi awal
        kreatorId: kreatorId, // ID kreator yang terkait
        subscriberId: subscriber.id, // ID subscriber
      },
    });

    // Mengembalikan response dengan data transaksi Midtrans dan ID transaksi yang baru dibuat
    return NextResponse.json({
      transaction,
      newTransaction,
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}



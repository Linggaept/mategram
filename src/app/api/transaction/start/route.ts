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

    // Buat transaksi
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: `order-${Date.now()}`, // ID transaksi unik
        gross_amount: amount, // Total biaya
      },
      customer_details: {
        email: email,
      },
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    const { order_id, transaction_status, payment_type, gross_amount } =
      notification;

    // Temukan transaksi berdasarkan order_id
    const transaction = await prisma.transaksi.findUnique({
      where: { id: order_id },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    // Perbarui status transaksi di database
    const updatedTransaction = await prisma.transaksi.update({
      where: { id: order_id },
      data: {
        totalTransaksi: parseFloat(gross_amount), // Pastikan gross_amount adalah string angka
        paymentStatus: transaction_status,
        paymentType: payment_type,
        statusTransaksi:
          transaction_status === "settlement" ||
          transaction_status === "capture"
            ? "success"
            : transaction_status === "pending"
            ? "pending"
            : "failed",
      },
    });

    return NextResponse.json(
      { message: "Notifikasi berhasil diproses.", data: updatedTransaction },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing notification:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses notifikasi." },
      { status: 500 }
    );
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    console.log("Notification received:", notification);  // Menambahkan log untuk melihat data yang diterima

    const { order_id, transaction_status, payment_type, gross_amount } = notification;

    // Validasi order_id sebagai UUID
    if (!uuidValidate(order_id)) {
      console.error("Invalid order_id:", order_id);  // Log jika order_id tidak valid
      return NextResponse.json(
        { error: "order_id tidak valid." },
        { status: 400 }
      );
    }

    // Temukan transaksi berdasarkan order_id (yang sudah valid UUID)
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

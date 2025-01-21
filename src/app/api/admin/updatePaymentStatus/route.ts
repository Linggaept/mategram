import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, action } = await req.json(); // action menentukan "bayar" atau "batalkan"

    const transaksi = await prisma.transaksi.findUnique({
      where: { id },
      select: { paymentStatus: true },
    });

    if (!transaksi) {
      return NextResponse.json(
        { message: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    if (action === "bayar" && transaksi.paymentStatus === "belum dibayar") {
      // Mengupdate status menjadi "dibayar"
      await prisma.transaksi.update({
        where: { id },
        data: { paymentStatus: "dibayar" },
      });
    } else if (action === "batalkan" && transaksi.paymentStatus === "dibayar") {
      // Mengupdate status menjadi "belum dibayar"
      await prisma.transaksi.update({
        where: { id },
        data: { paymentStatus: "belum dibayar" },
      });
    } else {
      return NextResponse.json(
        { message: "Aksi tidak valid atau status tidak sesuai" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Status pembayaran berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

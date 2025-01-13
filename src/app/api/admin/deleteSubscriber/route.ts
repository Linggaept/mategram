/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"; // Sesuaikan path dengan struktur proyek Anda

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Ambil `id` dari body request

    if (!id) {
      return NextResponse.json(
        { message: "Subscriber ID is required" },
        { status: 400 }
      );
    }

    // Mengecek apakah kreator yang akan dihapus memiliki transaksi atau subscription aktif
    const subscriber = await prisma.subscriber.findUnique({
      where: { id },
    });

    if (!subscriber) {
      return NextResponse.json(
        { message: "Subscriber tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus kreator berdasarkan ID jika tidak ada transaksi atau subscription terkait
    await prisma.subscriber.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "subscriber berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: any) {
    // Tangani error jika subscriber tidak ditemukan atau masalah lain
    return NextResponse.json(
      { message: "Gagal menghapus subscriber", error: error.message },
      { status: 500 }
    );
  }
}

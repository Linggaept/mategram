/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"; // Sesuaikan path dengan struktur proyek Anda

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Ambil `id` dari body request

    if (!id) {
      return NextResponse.json(
        { message: "Kreator ID is required" },
        { status: 400 }
      );
    }

    // Mengecek apakah kreator yang akan dihapus memiliki transaksi atau subscription aktif
    const kreator = await prisma.kreator.findUnique({
      where: { id },
    });

    if (!kreator) {
      return NextResponse.json(
        { message: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus kreator berdasarkan ID jika tidak ada transaksi atau subscription terkait
    await prisma.kreator.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Kreator berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: any) {
    // Tangani error jika kreator tidak ditemukan atau masalah lain
    return NextResponse.json(
      { message: "Gagal menghapus kreator", error: error.message },
      { status: 500 }
    );
  }
}

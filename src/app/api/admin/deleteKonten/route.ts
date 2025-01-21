import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const konten = await prisma.konten.findUnique({
      where: { id },
    });

    if (!id) {
      return NextResponse.json(
        { message: "ID tidak ditemukan" },
        { status: 400 }
      );
    }
    await prisma.konten.delete({ where: { id } });

    return NextResponse.json({
      message: "Konten berhasil dihapus",
      konten,
    });
  } catch (error) {
    console.error("Error deleting konten:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

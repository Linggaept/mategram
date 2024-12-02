import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Tunggu params diproses
    const { id } = await context.params;

    // Ambil data konten berdasarkan ID dan sertakan data kreator
    const konten = await prisma.konten.findUnique({
      where: { id },
      include: {
        kreator: true, // Sertakan data kreator
      },
    });

    if (!konten) {
      return NextResponse.json(
        { message: "Konten tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(konten);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Periksa apakah konten ada
    const existingContent = await prisma.konten.findUnique({
      where: { id },
    });

    if (!existingContent) {
      return NextResponse.json(
        { message: "Konten tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus konten
    await prisma.konten.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Konten berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat menghapus konten" },
      { status: 500 }
    );
  }
}

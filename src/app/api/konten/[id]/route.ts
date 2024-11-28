import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ambil ID dari URL params
    const { id } = params;

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

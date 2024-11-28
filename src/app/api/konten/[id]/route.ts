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
    return NextResponse.json(
      { message: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

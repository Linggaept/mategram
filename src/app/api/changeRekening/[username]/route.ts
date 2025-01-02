// src/app/api/changeRekening/[username]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  try {
    const body = await req.json();
    const { namaRekening, nomorRekening } = body;

    if (!namaRekening || !nomorRekening) {
      return NextResponse.json(
        { error: "Nama rekening dan nomor rekening tidak boleh kosong." },
        { status: 400 }
      );
    }

    const kreator = await prisma.kreator.findUnique({
      where: { username },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan." },
        { status: 404 }
      );
    }

    // Hapus rekening sebelumnya jika ada
    if (kreator.rekeningId) {
      await prisma.rekening.delete({
        where: { id: kreator.rekeningId },
      });
    }

    // Buat rekening baru dan hubungkan dengan kreator
    const newRekening = await prisma.rekening.create({
      data: {
        namaRekening,
        nomorRekening,
        kreator: {
          connect: { id: kreator.id },
        },
      },
    });

    return NextResponse.json({
      message: "Rekening berhasil dibuat.",
      data: newRekening,
    });
  } catch (error) {
    console.error("Error creating rekening:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat rekening." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

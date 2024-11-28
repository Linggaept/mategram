/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// API untuk mengambil data kreator berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Ambil data kreator berdasarkan ID dan konten yang dimilikinya
    const kreator = await prisma.kreator.findUnique({
      where: {
        id: id, // mencari kreator berdasarkan ID
      },
      select: {
        nama: true, // ambil nama kreator
        username: true, // ambil username kreator
        deskripsi: true, // ambil deskripsi kreator
        fotoProfil: true, // ambil foto profil kreator
        fotoBanner: true, // ambil foto banner kreator
        konten: {
          // ambil konten yang dimiliki kreator

          select: {
            id: true,
            konten: true, // ambil nama file/video konten
            deskripsi: true, // deskripsi konten
          },
        },
      },
    });

    // Jika kreator ditemukan, return data kreator
    if (kreator) {
      return NextResponse.json(kreator);
    } else {
      return NextResponse.json(
        { message: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

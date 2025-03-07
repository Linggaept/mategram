import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, username, email, password } = body;

    // Validasi input
    if (!nama || !username || !email || !password) {
      return NextResponse.json(
        { message: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.kreator.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah digunakan!" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat kreator baru
    const kreator = await prisma.kreator.create({
      data: {
        nama,
        username,
        email,
        fotoBanner: "default.jpg",
        fotoProfil: "default.png",
        password: hashedPassword,
        statusAkun: true, 
        biayaSubscription: 0, 
      },
    });

    return NextResponse.json(
      { message: "Pendaftaran kreator berhasil!", kreator },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during creator registration:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server!" },
      { status: 500 }
    );
  }
}

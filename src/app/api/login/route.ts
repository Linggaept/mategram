import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma"; // Pastikan path ini benar

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.kreator.findUnique({
      where: {  email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Kirim respon dengan ID pengguna dan token
    return NextResponse.json({
      message: "Login berhasil",
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan", error: (error as Error).message },
      { status: 500 }
    );
  }
}

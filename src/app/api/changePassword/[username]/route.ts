import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;
  console.log("Username:", username); // Debugging

  try {
    // Parse JSON body
    let body;
    try {
      body = await req.json();
      console.log("Request body:", body); // Debugging
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { passwordLama, passwordBaru } = body;

    // Validasi input
    if (!passwordLama || !passwordBaru) {
      return NextResponse.json(
        { error: "Password lama dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    // Cari user berdasarkan username
    const kreator = await prisma.kreator.findUnique({
      where: { username },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }

    // Verifikasi password lama
    const isPasswordValid = await bcrypt.compare(
      passwordLama,
      kreator.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password lama salah" },
        { status: 401 }
      );
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(passwordBaru, 10);

    // Update password di database
    await prisma.kreator.update({
      where: { username },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password berhasil diubah" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

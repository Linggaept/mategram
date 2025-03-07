import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    // Parse JSON body
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { passwordLama, passwordBaru } = body;

    if (!passwordLama || !passwordBaru) {
      return NextResponse.json(
        { error: "Password lama dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    const kreator = await prisma.kreator.findUnique({
      where: { username },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }

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

    const hashedPassword = await bcrypt.hash(passwordBaru, 10);

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

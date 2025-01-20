import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "admin tidak ditemukan" },
        { status: 404 }
      );
    }

    if (admin.password !== passwordLama) {
      return NextResponse.json(
        { error: "Password lama salah" },
        { status: 401 }
      );
    }

    if (passwordBaru !== passwordBaru) {
      return NextResponse.json(
        { error: "Password baru dan konfirmasi password tidak sama" },
        { status: 400 }
      );
    }

    if (passwordBaru === passwordLama) {
      return NextResponse.json(
        { error: "Password baru tidak boleh sama dengan password lama" },
        { status: 400 }
      );
    }

    await prisma.admin.update({
      where: { username },
      data: { password: passwordBaru },
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

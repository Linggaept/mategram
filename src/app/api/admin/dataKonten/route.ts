import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const konten = await prisma.konten.findMany({
      include: {
        kreator: true,
      },
    });
    return NextResponse.json(konten, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}

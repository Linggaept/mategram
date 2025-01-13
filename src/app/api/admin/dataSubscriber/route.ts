import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function GET() {
  try {
    // Fetch semua data kreator dari database
    const kreators = await prisma.subscriber.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    // Kirim respon
    return NextResponse.json(kreators, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat mengambil data kreator",
        error: error,
      },
      { status: 500 }
    );
  }
}

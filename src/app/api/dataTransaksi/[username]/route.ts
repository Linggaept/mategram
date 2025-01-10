import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function GET(
  req: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    // Cari kreator berdasarkan username
    const kreator = await prisma.kreator.findUnique({
      where: { username },
      include: {
        transaksi: true, // Termasuk data transaksi
      },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }

    // Kembalikan data transaksi
    return NextResponse.json(kreator.transaksi);
  } catch (error) {
    console.error("Error fetching transaksi:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data transaksi" },
      { status: 500 }
    );
  }
}

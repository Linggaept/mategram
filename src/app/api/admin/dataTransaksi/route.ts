import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const transaksi = await prisma.transaksi.findMany({
      include: { kreator: true, subscriber: true },
    });

    const formattedTransaksi = transaksi.map((item) => ({
      ...item,
      tanggal: item.tanggal.toISOString(),
    }));

    return NextResponse.json({ transaksi: formattedTransaksi });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}

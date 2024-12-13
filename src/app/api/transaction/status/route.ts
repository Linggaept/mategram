import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID tidak ditemukan." },
      { status: 400 }
    );
  }

  const transaction = await prisma.transaksi.findUnique({
    where: { id: orderId },
  });

  if (!transaction) {
    return NextResponse.json(
      { error: "Transaksi tidak ditemukan." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { statusTransaksi: transaction.statusTransaksi },
    { status: 200 }
  );
}

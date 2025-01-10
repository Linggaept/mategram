import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  if (!username) {
    return NextResponse.json(
      { error: "Username tidak ditemukan" },
      { status: 400 }
    );
  }

  try {
    // Cari kreator berdasarkan username
    const kreator = await prisma.kreator.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }

    const kreatorId = kreator.id;

    // Hitung total penghasilan bulan ini
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const totalPenghasilanBulanIni = await prisma.transaksi.aggregate({
      _sum: { totalTransaksi: true },
      where: {
        kreatorId,
        tanggal: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        statusTransaksi: "success",
      },
    });

    // Hitung total penghasilan bulan lalu
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const totalPenghasilanBulanLalu = await prisma.transaksi.aggregate({
      _sum: { totalTransaksi: true },
      where: {
        kreatorId,
        tanggal: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
        statusTransaksi: "success",
      },
    });

    // Hitung total subscriber
    const totalSubscriber = await prisma.subscription.count({
      where: {
        kreatorId,
        statusSubscription: "aktif",
      },
    });

    return NextResponse.json({
      totalPenghasilanBulanIni:
        totalPenghasilanBulanIni._sum.totalTransaksi || 0,
      totalPenghasilanBulanLalu:
        totalPenghasilanBulanLalu._sum.totalTransaksi || 0,
      totalSubscriber,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}

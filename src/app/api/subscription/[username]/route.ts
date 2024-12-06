import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;

    const kreator = await prisma.kreator.findUnique({
      where: { username },
      select: {
        id: true,
        nama: true,
        username: true,
        deskripsi: true,
        fotoProfil: true,
        fotoBanner: true,
        _count: {
          select: {
            konten: true, // ambil jumlah konten yang dimiliki kreator
          },
        },
      },
    });

    const totalKodeSubscription = await prisma.subscription.aggregate({
      where: {
        kreatorId: username, // hanya hitung subscription untuk kreator ini
      },
      _count: {
        kodeSubscription: true, // hitung jumlah kodeSubscription
      },
    });

    if (kreator) {
      return NextResponse.json({
        ...kreator,
        totalKodeSubscription:
          totalKodeSubscription._count.kodeSubscription || 0, // tambahkan total kodeSubscription
      });
    } else {
      return NextResponse.json(
        { message: "Kreator tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(kreator);
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan", error: error },
      { status: 500 }
    );
  }
}

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
        biayaSubscription : true,
        _count: {
          select: {
            konten: true, // ambil jumlah konten yang dimiliki kreator
          },
        },
      },
    });

    const totalKodeSubscription = await prisma.subscription.aggregate({
      where: {
        kreatorId: kreator?.id, // hanya hitung subscription untuk kreator ini
      },
      _count: {
        kodeSubscription: true, // hitung jumlah kodeSubscription
      },
    });

    if (kreator) {
      console.log(totalKodeSubscription);
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

  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan", error: error },
      { status: 500 }
    );
  }
}

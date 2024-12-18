/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// API untuk mengambil data kreator berdasarkan ID
export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    // Ambil data kreator berdasarkan ID dan konten yang dimilikinya
    const kreator = await prisma.kreator.findUnique({
      where: {
        username: username, // mencari kreator berdasarkan username
      },
      select: {
        id: true,
        nama: true,
        username: true,
        deskripsi: true,
        fotoProfil: true,
        fotoBanner: true,
        konten: {
          // ambil konten yang dimiliki kreator
          select: {
            id: true,
            konten: true,
            deskripsi: true,
            type: true,
          },
        },
        _count: {
          select: {
            konten: true, // ambil jumlah konten yang dimiliki kreator
          },
        },
      },
    });

    // Hitung jumlah kodeSubscription pada model Subscription
    const totalKodeSubscription = await prisma.subscription.aggregate({
      where: {
        kreatorId: kreator?.id, // hanya hitung subscription untuk kreator ini
      },
      _count: {
        kodeSubscription: true, // hitung jumlah kodeSubscription
      },
    });

    // Jika kreator ditemukan, return data kreator dan jumlah kodeSubscription
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

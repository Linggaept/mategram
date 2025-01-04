/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// API untuk mengambil data kreator berdasarkan username
export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;

    const kreator = await prisma.kreator.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        nama: true,
        username: true,
        deskripsi: true,
        fotoProfil: true,
        fotoBanner: true,
        email: true,
        biayaSubscription: true,
        konten: {
          select: {
            id: true,
            konten: true,
            deskripsi: true,
            type: true,
          },
        },
        rekening: true,
        _count: {
          select: {
            konten: true,
          },
        },
      },
    });

    const totalKodeSubscription = await prisma.subscription.aggregate({
      where: {
        kreatorId: kreator?.id,
      },
      _count: {
        kodeSubscription: true,
      },
    });

    if (kreator) {
      return NextResponse.json({
        ...kreator,
        totalKodeSubscription:
          totalKodeSubscription._count.kodeSubscription || 0,
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

export async function PUT(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    const body = await request.json();

    const { nama, deskripsi, fotoProfil, fotoBanner } = body;

    const updatedKreator = await prisma.kreator.update({
      where: {
        username: username,
      },
      data: {
        nama,
        deskripsi,
        fotoProfil,
        fotoBanner,
      },
    });

    return NextResponse.json(updatedKreator);
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

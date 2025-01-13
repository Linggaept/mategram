import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, statusAkun } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Kreator ID is required" },
        { status: 400 }
      );
    }

    // Update status akun berdasarkan nilai yang diterima
    await prisma.kreator.update({
      where: { id },
      data: { statusAkun },
    });

    return NextResponse.json(
      {
        message: statusAkun
          ? "Kreator berhasil dinonaktifkan"
          : "Kreator berhasil diaktifkan",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengubah status kreator", error },
      { status: 500 }
    );
  }
}

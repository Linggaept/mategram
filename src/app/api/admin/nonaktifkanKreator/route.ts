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

    if (statusAkun === false) {
      await prisma.kreator.update({
        where: { id },
        data: { statusAkun: true },
      });

      return NextResponse.json(
        { message: "Kreator berhasil dinonaktifkan" },
        { status: 200 }
      );
    } else if (statusAkun === true) {
      await prisma.kreator.update({
        where: { id },
        data: { statusAkun: false },
      });

      return NextResponse.json(
        { message: "Kreator berhasil diaktifkan" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menonaktifkan kreator", error },
      { status: 500 }
    );
  }
}

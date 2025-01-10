import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;

    const admin = await prisma.admin.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        nama: true,
        username: true,
        email: true,
        fotoProfil: true,
        pembayaranKreator: true,
      },
    });
    if (admin) {
      return NextResponse.json(
        {
          ...admin,
          message: "admin ditemukan",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "admin tidak ditemukan" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}

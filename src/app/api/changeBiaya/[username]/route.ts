// src/app/api/changeBiaya/[username]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  context: { params: Promise< { username: string }> }
) {
  const { username } = await context.params;

  try {
    const body = await req.json();
    const { biayaSubscription } = body;

    if (!biayaSubscription || isNaN(biayaSubscription)) {
      return NextResponse.json(
        { error: "Biaya subscription harus berupa angka." },
        { status: 400 }
      );
    }

    const updatedKreator = await prisma.kreator.update({
      where: { username },
      data: { biayaSubscription: parseFloat(biayaSubscription) },
    });

    return NextResponse.json({
      message: "Biaya subscription berhasil diupdate.",
      data: updatedKreator,
    });
  } catch (error) {
    console.error("Error updating biayaSubscription:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengupdate biaya subscription." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

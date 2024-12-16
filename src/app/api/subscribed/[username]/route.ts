import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    const body = await request.json();
    const { token } = body; // Ambil token dari body request

    // Cek apakah token valid dan sesuai dengan username kreator
    const subscription = await prisma.subscription.findFirst({
      where: {
        kodeSubscription: token,
        kreator: {
          username: username, // Pastikan token sesuai dengan kreator yang dimaksud
        },
      },
    });

    if (subscription) {
      // Jika token valid, arahkan subscriber ke halaman kreator
      return NextResponse.json({
        success: true,
        message: "Token valid. Arahkan ke halaman kreator.",
        username: username,
      });
    } else {
      // Jika token tidak valid
      return NextResponse.json(
        { message: "Token tidak valid atau tidak sesuai dengan kreator." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan", error: error },
      { status: 500 }
    );
  }
}

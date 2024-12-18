import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;
    const body = await request.json();
    const { token, subscriberId, kreatorId } = body;

    const subscription = await prisma.subscription.findFirst({
      where: {
        kodeSubscription: token,
        kreatorId: kreatorId,
        subscriberId: subscriberId,
        kreator: {
          username: username,
        },
      },
    });

    if (subscription) {
      // Generate JWT token
      const jwtToken = jwt.sign(
        {
          subscriberId,
          kreatorId,
          username,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return NextResponse.json({
        success: true,
        message: "Token valid. Arahkan ke halaman kreator.",
        username,
        jwtToken, // Kirim token JWT ke frontend
      });
    } else {
      return NextResponse.json(
        { message: "Token tidak valid atau data tidak sesuai." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in subscription verification:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan", error },
      { status: 500 }
    );
  }
}

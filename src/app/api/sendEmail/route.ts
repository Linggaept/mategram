/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, token } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: "Ini adalah Token Anda",
      text: `Ini adalah token anda token anda ${token}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
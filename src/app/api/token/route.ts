import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Library untuk membuat token unik
import prisma from "../../../../lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kreatorId, subscriberEmail, transaksiId } = body;

    if (!kreatorId || !subscriberEmail || !transaksiId) {
      console.error("Session storage data:", {
        kreatorId,
        subscriberEmail,
        transaksiId,
      });
      throw new Error(
        "Data tidak lengkap. Pastikan semua data tersedia di sessionStorage."
      );
    }

    // Validasi keberadaan kreator berdasarkan email
    const kreator = await prisma.kreator.findUnique({
      where: { id: kreatorId },
      select: {
        id: true,
        username: true,
      }
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan." },
        { status: 404 }
      );
    }

    // Validasi keberadaan subscriber berdasarkan email
    const subscriber = await prisma.subscriber.findUnique({
      where: { email: subscriberEmail },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber tidak ditemukan." },
        { status: 404 }
      );
    }

    // Validasi keberadaan transaksi
    const transaksi = await prisma.transaksi.findUnique({
      where: { id: transaksiId },
    });

    if (!transaksi) {
      return NextResponse.json(
        { error: "Transaksi tidak ditemukan." },
        { status: 404 }
      );
    }

    // Generate kode subscription unik
    const kodeSubscription = uuidv4();

    // Simpan data subscription ke database
    const newSubscription = await prisma.subscription.create({
      data: {
        kodeSubscription,
        statusSubscription: "aktif",
        kreatorId: kreator.id,
        subscriberId: subscriber.id,
        transaksiId: transaksi.id,
      },
    });

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
        from: process.env.EMAIL_RECEIVER,
        to: subscriberEmail,
        replyTo: process.env.EMAIL_RECEIVER,
        subject: "Selamat Berlangganan Konten Eksklusif!",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto;">
          <p>Selamat siang,</p>
          <p>
            Selamat Anda telah berlangganan konten eksklusif dari
            <strong>${kreator.username}</strong>. Berikut link dan kode untuk mengakses konten eksklusif:
          </p>
          <p>
            <strong>Kode</strong>: ${kodeSubscription}<br />
            <strong>Link</strong>: 
            <a href="https://www.mategram.online/subscription/${kreator.username}/input-token/${subscriber.id}" style="color: #007bff; text-decoration: none;">
              https://www.mategram.online/subscription/${kreator.username}/input-token/${subscriber.id}
            </a>
          </p>
          <p style="margin-top: 20px;">Terimakasih,<br />Mategram</p>
        </div>
        `,
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return NextResponse.json(
      {
        message: "Subscription berhasil dibuat.",
        subscription: newSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

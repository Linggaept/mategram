import { NextResponse } from "next/server";
import crypto from "crypto"; // Untuk membuat token acak
import prisma from "../../../../../../lib/prisma";

export async function POST(req: Request) {
  const {
    order_id,
    transaction_status,
    payment_type,
    amount,
    statusTransaksi,
  } = await req.json();

  // Temukan transaksi berdasarkan order_id
  const transaction = await prisma.transaksi.findUnique({
    where: { id: order_id },
  });

  if (!transaction) {
    return NextResponse.json(
      { error: "Transaksi tidak ditemukan." },
      { status: 404 }
    );
  }

  // Pastikan kreatorId tidak null sebelum melanjutkan
  if (!transaction.kreatorId) {
    return NextResponse.json(
      { error: "Kreator ID tidak ditemukan pada transaksi." },
      { status: 400 }
    );
  }

  // Pastikan subscriberId ada (tidak null)
  if (!transaction.subscriberId) {
    return NextResponse.json(
      { error: "Subscriber ID tidak ditemukan pada transaksi." },
      { status: 400 }
    );
  }

  // Jika status transaksi adalah "settlement" atau "capture" (berhasil)
  if (statusTransaksi === "pending") {
    // Membuat token acak sepanjang 16 karakter
    const token = crypto.randomBytes(8).toString("hex"); // menghasilkan 16 karakter

    // Perbarui status transaksi di database
    await prisma.transaksi.update({
      where: { id: order_id },
      data: {
        totalTransaksi: amount,
        paymentStatus: transaction_status,
        paymentType: payment_type,
        statusTransaksi: "success",
      },
    });

    // Menambahkan entri baru di Subscription
    await prisma.subscription.create({
      data: {
        kodeSubscription: token,
        statusSubscription: "active",
        transaksiId: order_id,
        kreatorId: transaction.kreatorId, // Menggunakan kreatorId dari transaksi
        subscriberId: transaction.subscriberId, // Menggunakan subscriberId dari transaksi
      },
    });

    // Dapatkan kreator berdasarkan transaksi
    const kreator = await prisma.kreator.findUnique({
      where: { id: transaction.kreatorId },
    });

    if (!kreator) {
      return NextResponse.json(
        { error: "Kreator tidak ditemukan." },
        { status: 404 }
      );
    }

    // Mengarahkan ke halaman input token
    const redirectUrl = `/subscription/${kreator.username}/input-token`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.json({ message: "Transaksi gagal." }, { status: 400 });
}

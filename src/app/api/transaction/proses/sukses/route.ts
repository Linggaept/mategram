import { NextResponse } from "next/server";
import fetch from "node-fetch"; // Untuk melakukan POST request

export async function GET(req: Request) {
  const url = new URL(req.url);
  const order_id = url.searchParams.get("order_id");
  const transaction_status = url.searchParams.get("transaction_status");
  const payment_type = url.searchParams.get("payment_type");
  const amount = url.searchParams.get("amount");

  if (!order_id || !transaction_status) {
    return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
  }

  // Kirim data transaksi ke endpoint POST untuk pemrosesan lebih lanjut
  const response = await fetch("/api/transaction/finish/sukses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id,
      transaction_status,
      payment_type,
      amount,
    }),
  });

  if (response.ok) {
    return NextResponse.json(
      { message: "Notifikasi berhasil diproses." },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses notifikasi." },
      { status: 500 }
    );
  }
}

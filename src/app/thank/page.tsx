/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Dibutuhkan untuk mengakses state dan event di Next.js App Router
import { useState } from "react";

export default function ThankPage() {
  const [isClaiming, setIsClaiming] = useState(false); // State untuk loading
  const [message, setMessage] = useState<string | null>(null); // State untuk pesan respons

  const handleClaimToken = async () => {
    setIsClaiming(true);
    setMessage(null);

    try {
      const kreatorId = sessionStorage.getItem("idKreator");
      const subscriberEmail = sessionStorage.getItem("emailSubscriber");
      const transaksiId = sessionStorage.getItem("idTransaksi");

      if (!kreatorId || !subscriberEmail || !transaksiId) {
        console.error("Session storage data:", {
          kreatorId,
          subscriberEmail,
          transaksiId,
        });
      }

      const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kreatorId,
          subscriberEmail,
          transaksiId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal mengambil token.");
      }

      setMessage(`Kode berhasil diklaim! Silahkan cek Email Anda!`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Pembayaran Sukses!</h1>
      <button
        onClick={handleClaimToken}
        className="bg-blue-600 text-white border border-white rounded-full px-8 py-2 text-lg font-semibold justify-center flex mt-4"
        disabled={isClaiming} // Nonaktifkan tombol selama proses
      >
        {isClaiming ? "Loading..." : "Claim Kode"}
      </button>

      {message && (
        <p className="mt-4 text-lg text-gray-700">{message}</p> // Tampilkan pesan API
      )}
    </div>
  );
}

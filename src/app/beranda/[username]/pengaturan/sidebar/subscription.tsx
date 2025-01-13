/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

export default function Subscription() {
  const [biaya, setBiaya] = useState("");
  const [kreator, setKreator] = useState<any>(null);
  const [namaRekening, setNamaRekening] = useState<string>("");
  const [nomorRekening, setNomorRekening] = useState<string>("");

  const { username } = useParams();

  // Mengambil data kreator dari API
  const dataKreator = async () => {
    try {
      const response = await fetch(`/api/kreator/${username}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Gagal memuat data kreator");
      const data = await response.json();
      setKreator({
        namaRekening: data.rekening?.namaRekening || "",
        nomorRekening: data.rekening?.nomorRekening || "",
        biaya: data.biayaSubscription,
      });
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat memuat data kreator.");
    }
  };

  useEffect(() => {
    dataKreator();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dirender

  // Fungsi untuk memperbarui biaya subscription
  const updateSubscriptionCost = async (biayaSubscription: string) => {
    try {
      const response = await fetch(`/api/changeBiaya/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ biayaSubscription: biayaSubscription }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Biaya subscription berhasil diupdate.");
      }
      if (!response.ok) {
        alert(
          data.error || "Terjadi kesalahan saat mengupdate biaya subscription."
        );
      }
    } catch (err: any) {
      alert(
        err.message || "Terjadi kesalahan saat mengupdate biaya subscription."
      );
    }
  };

  const updateRekening = async () => {
    try {
      const response = await fetch(`/api/changeRekening/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ namaRekening, nomorRekening }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Rekening berhasil diupdate.");
      } else {
        alert(data.error || "Terjadi kesalahan saat mengupdate rekening.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat mengupdate rekening.");
    }
  };

  // Menunggu data kreator untuk di-fetch sebelum merender komponen
  if (!kreator) {
    return <div><Loading /></div>; // Menampilkan loading state sampai data kreator tersedia
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Biaya Subscription */}
      <div className="bg-white rounded-2xl shadow">
        <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
          Biaya Subscription
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (isNaN(parseFloat(biaya))) {
              alert("Biaya harus berupa angka.");
            } else {
              await updateSubscriptionCost(biaya);
            }
          }}
        >
          <div className="block md:flex items-center px-6 py-2 mt-4">
            <label
              htmlFor="biaya"
              className="text-black font-normal text-lg w-2/12"
            >
              Biaya Subscription
            </label>
            <input
              type="text"
              name="biaya"
              id="biaya"
              defaultValue={kreator.biaya}
              onChange={(e) => setBiaya(e.target.value)}
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>

          <div className="w-11/12 md:w-3/12 items-end flex justify-end py-4 mb-2">
            <button
              type="submit"
              className="py-2 px-8 rounded-3xl bg-blue-600 text-white font-semibold text-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      {/* Rekening */}
      <div className="bg-white rounded-2xl shadow">
        <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
          Rekening
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateRekening();
          }}
          className="flex flex-col w-full mt-4"
        >
          <div className="block md:flex px-6 py-2 items-center">
            <label
              htmlFor="namaRekening"
              className="text-black font-normal text-lg w-2/12"
            >
              Nama Rekening
            </label>
            <input
              type="text"
              name="namaRekening"
              id="namaRekening"
              defaultValue={kreator.namaRekening}
              onChange={(e) => setNamaRekening(e.target.value)}
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="block md:flex px-6 py-2 items-center">
            <label
              htmlFor="nomorRekening"
              className="text-black font-normal text-lg w-2/12"
            >
              No. Rekening
            </label>
            <input
              type="text"
              name="nomorRekening"
              id="nomorRekening"
              defaultValue={kreator.nomorRekening}
              onChange={(e) => setNomorRekening(e.target.value)}
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="w-11/12 md:w-3/12 items-end flex justify-end py-4 mb-2">
            <button
              type="submit"
              className="py-2 px-8 rounded-3xl bg-blue-600 text-white font-semibold text-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

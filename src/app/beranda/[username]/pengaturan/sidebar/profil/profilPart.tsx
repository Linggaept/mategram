/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProfilPart() {
  const [profil, setProfil] = useState({
    nama: "",
    username: "",
    email: "",
    fotoProfil: "",
    fotoBanner: "",
    deskripsi: "",
  });

  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Ambil data profil dari API
  useEffect(() => {
    async function fetchProfil() {
      try {
        setLoading(true);
        const response = await fetch(`/api/kreator/${username}`, {
          method: "GET",
        });
        if (!response.ok) throw new Error("Gagal memuat data profil");
        const data = await response.json();
        setProfil({
          nama: data.nama,
          username: data.username,
          email: data.email, // Email mungkin tidak dikembalikan oleh API
          fotoProfil: data.fotoProfil || "",
          fotoBanner: data.fotoBanner || "",
          deskripsi: data.deskripsi || "",
        });
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }

    fetchProfil();
  }, [ username ]);

  // Simpan data ke server
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const formData = new FormData(event.currentTarget);
      const updatedData = {
        nama: formData.get("nama"),
        deskripsi: formData.get("deskripsi"),
        fotoProfil: profil.fotoProfil, // Simpan file upload logic jika diperlukan
        fotoBanner: profil.fotoBanner, // Simpan file upload logic jika diperlukan
      };

      const response = await fetch(`/api/kreator/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data profil");

      const data = await response.json();
      setProfil((prev) => ({
        ...prev,
        ...data,
      }));
      setSuccessMessage("Profil berhasil diperbarui!");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow">
      <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
        Profil
      </h1>
      <div className="w-full flex flex-col">
        {error && <p className="text-red-500 px-6">{error}</p>}
        {successMessage && <p className="text-green-500 px-6">{successMessage}</p>}
        <div className="block md:flex mt-4">
          <p className="py-2 px-6 text-black font-normal text-lg w-full md:w-2/12">
            Username
          </p>
          <p className="py-2 px-6 text-black font-bold text-lg w-full ">
            {profil.username}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="block md:flex py-2 px-6 items-center">
            <label
              htmlFor="nama"
              className="text-black font-normal text-lg w-2/12"
            >
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              defaultValue={profil.nama}
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="block md:flex py-2 px-6 items-center">
            <label
              htmlFor="email"
              className="text-black font-normal text-lg w-2/12"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={profil.email}
              disabled
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-gray-200 text-black"
            />
          </div>
          <div className="block md:flex py-2 px-6 items-center">
            <label
              htmlFor="fotoProfil"
              className="text-black font-normal text-lg w-2/12"
            >
              Foto Profil
            </label>
            <input
              type="file"
              name="fotoProfil"
              id="fotoProfil"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="block md:flex py-2 px-6 items-center">
            <label
              htmlFor="fotoBanner"
              className="text-black font-normal text-lg w-2/12"
            >
              Foto Banner
            </label>
            <input
              type="file"
              name="fotoBanner"
              id="fotoBanner"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="block md:flex py-2 px-6 items-center">
            <label
              htmlFor="deskripsi"
              className="text-black font-normal text-lg w-2/12"
            >
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              defaultValue={profil.deskripsi}
              className="rounded-3xl w-full py-2 px-4 border border-gray-400 bg-white text-black"
            ></textarea>
          </div>

          <div className="w-11/12 md:w-3/12 items-end flex justify-end py-4 mb-2">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-8 rounded-3xl ${
                loading ? "bg-gray-400" : "bg-blue-600"
              } text-white font-semibold text-lg`}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface admin {
  nama: string;
  username: string;
  email: string;
}
/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ProfilPart() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState<admin | null>(null);
  const { username } = useParams();

  const dataAdmin = async () => {
    try {
      const response = await fetch(`/api/admin/${username}`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAdmin(data);
      }
    } catch {
      console.log("Terjadi kesalahan saat memuat data admin.");
    }
  };

  useEffect(() => {
    dataAdmin();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-black text-2xl font-bold mb-4">Profil Admin</h1>
      <div className="bg-white rounded-2xl shadow">
        <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
          Profil
        </h1>
        <div className="w-full flex flex-col">
          {error && <p className="text-red-500 px-6">{error}</p>}
          {successMessage && (
            <p className="text-green-500 px-6">{successMessage}</p>
          )}
          <div className="block md:flex mt-4">
            <p className="py-2 px-6 text-black font-normal text-lg w-full md:w-2/12">
              Username
            </p>
            <p className="py-2 px-6 text-black font-bold text-lg w-full ">
              {admin?.username}
            </p>
          </div>
          <div className="block md:flex mt-4">
            <p className="py-2 px-6 text-black font-normal text-lg w-full md:w-2/12">
              Nama
            </p>
            <p className="py-2 px-6 text-black font-bold text-lg w-full ">
              {admin?.nama}
            </p>
          </div>
          <div className="block md:flex mt-4 mb-6">
            <p className="py-2 px-6 text-black font-normal text-lg w-full md:w-2/12">
              Email
            </p>
            <p className="py-2 px-6 text-black font-bold text-lg w-full ">
              {admin?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

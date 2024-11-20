/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Router dari next/navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/login", { email, password });

      // Simpan token di localStorage
      localStorage.setItem("token", response.data.token);
      setMessage(response.data.message);

      // Redirect ke halaman beranda dengan ID
      const userId = response.data.id; // ID pengguna dari respons API
      router.push(`/beranda/${userId}`); // Gunakan router.push untuk redirect
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="xl:p-20 p-4">
      <main className="flex flex-col mx-auto">
        <div className="flex items-center mx-auto py-10">
          <Image src="/Logo.png" alt="Logo" width={30} height={30} />
          <h1 className="font-semibold text-center text-2xl ml-2">Mategram</h1>
        </div>

        <div className="flex flex-col mx-auto xl:p-10 p-6 border border-gray-300 rounded-xl md:w-4/12 w-3/4">
          <h1 className="font-semibold text-center text-3xl">Masuk</h1>
          <div className="flex gap-1 text-center justify-center mx-auto pb-6">
            <p className="text-center text-sm font-normal">
              Belum punya akun Mategram?{" "}
            </p>
            <Link
              href="/daftar"
              className="text-blue-600 text-center text-sm font-semibold hover:text-blue-500 duration-150"
            >
              Daftar
            </Link>
          </div>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-md">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <label htmlFor="password" className="font-medium text-md">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white text-md font-semibold rounded-3xl px-6 py-2 mt-6 w-full hover:bg-blue-700 duration-150"
            >
              Masuk
            </button>
            {message && <p className="text-green-600 mt-4">{message}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

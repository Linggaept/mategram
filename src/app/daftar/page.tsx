/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Daftar() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/daftar", {
        nama,
        username,
        email,
        password,
      });

      setLoading(false);
      setMessage(response.data.message);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Terjadi kesalahan!");
    }
  };

  return (
    <div className="xl:p-20 p-4">
      <main className="flex flex-col mx-auto">
        <div className="flex items-center mx-auto py-10">
          <Image src="/Logo.png" alt="Logo" width={30} height={30} />
          <h1 className="font-semibold text-center text-2xl ml-2">Mategram</h1>
        </div>

        <div className="flex flex-col mx-auto xl:p-10 p-6 border border-gray-300 rounded-xl md:w-5/12 w-3/4">
          <h1 className="font-semibold text-center text-3xl">Daftar</h1>
          <div className="flex gap-1 text-center justify-center mx-auto pb-6">
            <p className="text-center text-sm font-normal">
              Belum punya akun Mategram?{" "}
            </p>
            <Link
              href="/"
              className="text-blue-600 text-center text-sm font-semibold hover:text-blue-500 duration-150"
            >
              Masuk
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="nama" className="font-medium text-md">
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  placeholder="Masukkan nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username" className="font-medium text-md">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
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
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="font-medium text-md">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <button className="bg-blue-600 text-white text-md font-semibold rounded-3xl px-6 py-2 mt-6 w-full hover:bg-blue-700 duration-150">
              Daftar
            </button>
          </form>

          {message && <p className="text-green-500 mt-2">{message}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </main>
    </div>
  );
}

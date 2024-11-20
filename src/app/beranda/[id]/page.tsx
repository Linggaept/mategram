"use client";
import { useParams } from "next/navigation";

export default function Beranda() {
  const params = useParams(); // Gunakan useParams untuk mendapatkan dynamic route parameter
  const id = params?.id; // Ambil ID dari URL

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }
  return (
    <div>
      <h1>Beranda</h1>
      <p>Selamat datang, pengguna dengan ID: {id}</p>
    </div>
  );
}

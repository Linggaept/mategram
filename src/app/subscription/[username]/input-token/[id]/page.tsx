/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InputToken() {
  const { username, id } = useParams();
  const [kreator, setKreator] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (username && id) {
      sessionStorage.setItem("idSubscriber", id as string);

      fetch(`/api/subscription/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setKreator(data);
        })
        .catch((err) => {
          console.error("Error fetching kreator data:", err);
        });
    }
  }, [username, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subscriberId = sessionStorage.getItem("idSubscriber");
    const response = await fetch(`/api/subscribed/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, subscriberId, kreatorId: kreator.id }),
    });

    const data = await response.json();

    if (response.ok) {
      // Simpan JWT token ke session storage
      sessionStorage.setItem("subscriberToken", data.jwtToken);

      // Redirect ke halaman kreator
      router.push(`/subscribed/${data.username}`);
    } else {
      setError(data.message);
    }
  };

  if (!kreator) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <div className="absolute left-6 top-6">
        <div className="flex items-center mx-auto ">
          <Image src="/Logo.png" alt="Logo" width={35} height={35} />
          <h1 className="font-semibold text-center text-2xl ml-2">Mategram</h1>
        </div>
      </div>
      <div className="w-full h-60">
        <Image
          src={`/fotoBanner/${kreator.fotoBanner}`}
          alt="Banner"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-blue-500 rounded-full absolute w-52 h-52 left-1/2 top-1/2.5 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white flex items-center justify-center">
        <Image
          src={`/fotoProfil/${kreator.fotoProfil}`}
          alt="Logo"
          width={1000}
          height={1000}
          className="rounded-full object-cover w-48 h-48"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col text-center justify-center mx-auto w-3/4 md:w-1/2 mt-32">
          <h1 className="font-semibold text-2xl">{kreator.nama}</h1>
          <h2 className="font-normal text-gray-400 text-lg">
            @{kreator.username}
          </h2>
          <p className="mt-4 font-normal">{kreator.deskripsi}</p>

          <form onSubmit={handleSubmit}>
            <div className="mt-8 w-8/12 mx-auto text-center flex justify-center">
              <input
                type="text"
                className="w-full px-4 py-2 border-4 rounded-l-full focus:outline-none focus:border-blue-500 border-blue-600"
                placeholder="Masukan Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />

              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded-r-full"
              >
                Pakai
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

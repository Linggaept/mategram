/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ViewImage from "@/app/beranda/modalImage";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubscribedPage() {
  const [kreator, setKreator] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContentId, setSelectedContentId] = useState<string>("");

  const openModal = (contentId: string) => {
    setSelectedContentId(contentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { username } = useParams(); // Ambil ID dari URL

  // Redirect ke halaman login jika token tidak ada
  useEffect(() => {
    if (username) {
      // Fetch data kreator
      fetch(`/api/subscription/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setKreator(data);
        })
        .catch((err) => {
          console.error("Error fetching kreator data:", err);
        });
    }
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!kreator) {
    return <p>Loading...</p>;
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
          src={`/fotoBanner/${kreator.fotoBanner}`} // Menggunakan path relatif ke folder public
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-1/2 mx-auto">
            <div className="flex flex-col">
              <h1 className="font-semibold text-3xl">
                {kreator._count?.konten}
              </h1>
              <p className="font-normal text-gray-400 text-lg">Postingan</p>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-3xl">
                {kreator.totalKodeSubscription}
              </h1>
              <p className="font-normal text-gray-400 text-lg">Subscriber</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-center mx-auto w-3/4">
            <p className="border-b-2 border-black w-full text-center text-xl p-5">
              Konten
            </p>
          </div>

          <div className="pb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-3/4 mx-auto">
              {/* Gambar konten */}
              {kreator.konten.map((item: any) => (
                <div
                  key={item.id}
                  className="aspect-square bg-gray-400 rounded-xl cursor-pointer"
                  onClick={() => openModal(item.id)} // Buka modal saat gambar diklik
                >
                  {item.type === "video" ? (
                    <video
                      src={`/api/viewKonten/${item.konten}`}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full rounded-xl"
                    />
                  ) : (
                    <Image
                      src={`/api/viewKonten/${item.konten}`}
                      alt={item.konten}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full rounded-xl"
                    />
                  )}
                </div>
              ))}
            </div>

            <ViewImage
              isOpen={isModalOpen}
              onClose={closeModal}
              contentId={selectedContentId} // Kirimkan contentId yang dipilih
            />
          </div>
        </div>
      </div>
    </main>
  );
}

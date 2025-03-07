/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import ModalKonten from "../modalKonten";
import Loading from "@/components/loading";

export default function SubscribedPage() {
  const [kreator, setKreator] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContentId, setSelectedContentId] = useState<string>("");
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  const { username } = useParams(); // Ambil username dari URL
  const router = useRouter();

  const openModal = (contentId: string) => {
    setSelectedContentId(contentId);
    setIsModalOpen(true);
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Validasi subscriberToken di sessionStorage
  useEffect(() => {
    const subscriberToken = sessionStorage.getItem("subscriberToken");
    if (!subscriberToken) {
      router.push("/"); // Redirect jika token tidak ada
    }
  }, [router]);

  // Ambil data kreator berdasarkan username yang diambil dari URL
  useEffect(() => {
    if (username) {
      axios
        .get(`/api/kreator/${username}`)
        .then((response) => {
          setKreator(response.data); // Simpan data kreator
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching kreator:", error);
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (!kreator) {
    return <div>Kreator tidak ditemukan</div>;
  }

  return (
    <main>
      <div className="absolute left-6 top-6">
        <div className="flex items-center mx-auto">
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

          <div className="text-center mt-4 py-2 px-6 bg-gray-600 rounded-full w-1/2 mx-auto">
            <p className="font-normal text-lg">Subscribed</p>
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
                  onClick={() => openModal(item.id)}
                >
                  {item.type === "video" ? (
                    <video
                      src={`/api/viewKonten/${item.konten}`}
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full rounded-xl"
                      controls
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

            <ModalKonten
              isOpen={isModalOpen}
              onClose={closeModal}
              contentId={selectedContentId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

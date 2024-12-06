/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { SubscribeModalButton } from "../subscribeModalButton";

const SubscriptionPage = () => {
  const { username } = useParams(); // Ambil username dari URL
  const [kreator, setKreator] = useState<any>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState<boolean>(false);

  const openSubscribeModal = () => {
    setSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setSubscribeModalOpen(false);
  };

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

          <div className="mt-8 w-8/12 mx-auto  text-center flex justify-center">
            <button
              onClick={openSubscribeModal}
              className="bg-blue-600 text-white rounded-full px-20 md:px-52 py-3 text-lg font-semibold justify-center flex"
            >
              Subscribe
            </button>
          </div>

          <SubscribeModalButton
            isOpen={subscribeModalOpen}
            onClose={closeSubscribeModal}
            kreator={kreator}
          />
        </div>
      </div>
    </main>
  );
};

export default SubscriptionPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Text, Button } from "@chakra-ui/react";
import Image from "next/image";

// OverlayOne component
const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

interface ModalImageProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string; // ID konten yang akan ditampilkan
}

export const ViewImage = ({ isOpen, onClose, contentId }: ModalImageProps) => {
  const [content, setContent] = useState<any>(null); // Untuk menyimpan data konten
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (contentId) {
      axios
        .get(`/api/konten/${contentId}`)
        .then((response) => {
          setContent(response.data);
          console.log("Data konten:", response.data); // Set data konten yang didapatkan
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
          setLoading(false);
        });
    }
  }, [contentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return <div>Konten tidak ditemukan</div>;
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <OverlayOne />
      <ModalContent className="p-10 min-h-screen justify-center absolute z-50 overflow-y-auto w-full">
        <ModalBody className=" mx-auto flex justify-center bg-white rounded-3xl overflow-hidden w-3/4">
          {/* Menampilkan gambar konten */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="">
              <Image
                src={`/konten/${content.konten}`} // Path gambar di dalam public/konten
                alt={content.konten}
                width={1000} // Tentukan ukuran gambar sesuai kebutuhan
                height={1000}
                className="aspect-square rounded-l-3xl object-cover"
              />
            </div>
            <div className="w-full flex flex-col justify-between">
              <div className="w-full border-b-2 border-gray-400">
                <div className="p-5">
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex">
                      <Image
                        src={`/fotoProfil/${content.kreator?.fotoProfil}`}
                        alt={`/fotoProfil/${content.kreator?.fotoProfil}`}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex">
                      <h1 className="text-black font-semibold text-xl">
                        {content.kreator?.nama}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full p-8 max-h-80 bg-red-200">
                <Text className="text-black">{content.deskripsi}</Text>
              </div>

              <div className="flex gap-4 p-8 mt-auto">
                <button className="px-6 py-2 text-lg rounded-full font-semibold text-red-700 border-2 border-red-700 bg-white">
                  Hapus
                </button>
                <button className="px-10 py-2 text-lg rounded-full font-semibold text-white bg-blue-600">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <ModalCloseButton />
            
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewImage;

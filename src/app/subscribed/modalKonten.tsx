/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { Text } from "@chakra-ui/react";
import Image from "next/image";

// OverlayOne component
const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

interface ModalKontenProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string; // ID konten yang akan ditampilkan
}

export const ModalKonten = ({
  isOpen,
  onClose,
  contentId,
}: ModalKontenProps) => {
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
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayOne />
        <ModalContent className="p-10 min-h-screen justify-center absolute z-50 w-full">
          <ModalBody className="mx-auto flex justify-center bg-white rounded-3xl overflow-hidden w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="">
                {/* Render Image or Video */}
                {content.type === "image" ? (
                  <Image
                    src={`/api/viewKonten/${content.konten}`}
                    alt={content.konten}
                    width={1000}
                    height={1000}
                    className="aspect-square rounded-l-3xl object-cover"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full aspect-square rounded-l-3xl object-cover"
                  >
                    <source
                      src={`/api/viewKonten/${content.konten}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="w-full flex flex-col justify-between h-full">
                <div className="w-full border-b-2 border-gray-400">
                  <div className="p-5">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex">
                        <Image
                          src={`/fotoProfil/${content.kreator?.fotoProfil}`}
                          alt={`/fotoProfil/${content.kreator?.fotoProfil}`}
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full object-cover"
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
                <div className="w-full p-8 max-h-40 md:max-h-80 overflow-y-auto">
                  <Text className="text-black">{content.deskripsi}</Text>
                </div>
              </div>
            </div>
            <div className="absolute top-8 right-8">
              <ModalCloseButton />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalKonten;

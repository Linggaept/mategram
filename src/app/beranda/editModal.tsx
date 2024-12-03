/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";

interface ContentProps {
  id: string;
  deskripsi?: string;
  kreator?: {
    nama: string;
    fotoProfil: string;
  };
  konten: string;
  type: "image" | "video";
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentProps;
}

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

const EditModal = ({ isOpen, onClose, content }: EditModalProps) => {
  const [description, setDescription] = useState(content?.deskripsi || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/konten/${content.id}`, { deskripsi: description });
      alert("Deskripsi berhasil diperbarui");
      onClose(); // Tutup modal setelah berhasil diperbarui
      window.location.reload();
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Gagal memperbarui deskripsi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <OverlayOne />
      <ModalContent
        className="p-10 justify-center absolute z-50 w-full min-h-screen"
        style={{ zIndex: 100 }}
      >
        <ModalBody className="mx-auto flex flex-col bg-white rounded-3xl overflow-hidden w-3/4 p-5">
          <h2 className="text-lg font-bold mb-5 text-black border-b-2 border-gray-600 w-full text-center">
            Edit Postingan
          </h2>
          {/* Pratinjau Gambar/Video dan Input Deskripsi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full">
            {/* Bagian Gambar/Video */}
            <div className="flex justify-center items-center">
              {content.type === "image" ? (
                <Image
                  src={`/api/viewKonten/${content.konten}`}
                  alt="Konten"
                  className="w-full h-full object-cover rounded-3xl"
                  width={300}
                  height={300}
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-cover rounded-l-3xl"
                >
                  <source
                    src={`/api/viewKonten/${content.konten}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Bagian Input Deskripsi */}
            <div className="">
              <Textarea
                placeholder="Tulis deskripsi konten disini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4 text-sm font-normal text-black border border-gray-600 rounded-3xl p-3 h-36"
              />
              {/* Tombol Aksi */}
              <div className="flex justify-end gap-4">
                <button
                  className="px-10 py-2 text-lg rounded-full font-semibold border-2 text-red-700 border-red-700 bg-white"
                  onClick={onClose}
                >
                  Batal
                </button>
                <button
                  className="px-10 py-2 text-lg rounded-full font-semibold text-white bg-blue-600"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
        <div className="absolute top-8 right-8">
          <ModalCloseButton />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

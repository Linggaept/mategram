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
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // Untuk status penghapusan

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

  const handleDelete = async () => {
    if (!contentId) return;

    setIsDeleting(true); // Tampilkan indikator proses penghapusan
    try {
      await axios.delete(`/api/konten/${contentId}`);
      alert("Konten berhasil dihapus");
      onClose(); // Tutup modal setelah berhasil menghapus
      window.location.reload();
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Gagal menghapus konten");
    } finally {
      setIsDeleting(false); // Sembunyikan indikator proses penghapusan
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return <div>Konten tidak ditemukan</div>;
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <OverlayOne />
      <ModalContent className="p-10 min-h-screen justify-center absolute z-50 w-full">
        <ModalBody className="mx-auto flex justify-center bg-white rounded-3xl overflow-hidden w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="">
              {/* Render Image or Video */}
              {content.type === "image" ? (
                <Image
                  src={`/konten/${content.konten}`}
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
                  <source src={`/konten/${content.konten}`} type="video/mp4" />
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
              <div className="w-full p-8 max-h-40 md:max-h-80 overflow-y-auto">
                <Text className="text-black">{content.deskripsi}</Text>
              </div>
              <div className="flex gap-2 md:gap-4 p-4 md:p-8 mt-auto">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`px-6 py-2 text-lg rounded-full font-semibold border-2 ${
                    isDeleting
                      ? "text-gray-500 border-gray-500 bg-gray-200"
                      : "text-red-700 border-red-700 bg-white"
                  }`}
                >
                  {isDeleting ? "Menghapus..." : "Hapus"}
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

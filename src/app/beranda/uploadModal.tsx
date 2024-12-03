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
import Image from "next/image";

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  kreatorId: string;
}

export const UploadModal = ({
  isOpen,
  onClose,
  kreatorId,
}: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false); // Check if file is a video

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const fileType = selectedFile.type;
      if (fileType.startsWith("video")) {
        setIsVideo(true);
      } else {
        setIsVideo(false);
      }

      // Generate preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!file || !description) {
      alert("Harap isi file dan deskripsi!");
      return;
    }

    // Create FormData with kreatorId
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("kreatorId", kreatorId); // Add kreatorId to formData

    try {
      setIsLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (response.ok) {
        alert("Konten berhasil diunggah!");
        setFile(null);
        setDescription("");
        setPreview(null);
        setIsVideo(false);
        onClose();
        window.location.reload();
      } else {
        console.error("Upload error:", responseData);
        alert(responseData.error || "Gagal mengunggah konten.");
      }
    } catch (error) {
      console.error("Error uploading content:", error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      portalProps={{ appendToParentPortal: false }}
    >
      <OverlayOne />
      <ModalContent
        className="p-10 min-h-screen justify-center absolute z-50 w-full"
        style={{ zIndex: 100 }}
      >
        <ModalBody className="mx-auto flex justify-center bg-white rounded-3xl overflow-hidden w-3/4">
          <div className="flex flex-col items-center p-5 w-full">
            <h2 className="text-lg font-bold mb-5 text-black border-b-2 border-gray-600 w-full items-center text-center">
              Buat Postingan Baru
            </h2>
            {/* Preview & File Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 w-full">
              <div className="flex flex-col items-center w-full">
                {/* Custom File Input */}
                <div className="w-full aspect-square bg-gray-200 border border-gray-600 rounded-lg overflow-hidden">
                  <label
                    htmlFor="file-input"
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    {preview ? (
                      isVideo ? (
                        <video
                          src={preview}
                          controls
                          className="object-cover w-full h-full"
                          poster="/default-thumbnail.png" // Optional: Replace with a default poster
                        >
                          Browser Anda tidak mendukung video tag.
                        </video>
                      ) : (
                        <Image
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                          width={1000}
                          height={1000}
                        />
                      )
                    ) : (
                      <span className="text-gray-400 text-sm">Pilih File</span>
                    )}
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Description & Upload Button */}
              <div className="flex flex-col w-full">
                <Textarea
                  placeholder="Tulis deskripsi konten disini..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4 text-sm font-normal text-black border border-gray-600 rounded-xl p-3 h-96"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleUpload}
                  disabled={!file || !description || isLoading}
                >
                  {isLoading ? "Mengunggah..." : "Unggah konten"}
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

export default UploadModal;

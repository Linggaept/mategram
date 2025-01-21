/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import ModalKontenAdmin from "./components/modalKontenAdmin";

export default function Konten() {
  const [konten, setKonten] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedContentId, setSelectedContentId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: string) => {
    setSelectedContentId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/deleteKonten`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        setKonten((prev) => prev.filter((item) => item.id !== id));
        alert(data.message || "Konten berhasil dihapus");
      } else {
        alert(data.message || "Gagal menghapus konten");
      }
    } catch (error) {
      console.error("Error deleting konten:", error);
      alert(`${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchKonten = async () => {
      try {
        const response = await fetch("/api/admin/dataKonten");
        const data = await response.json();
        setKonten(data);
      } catch (error) {
        console.error("Error fetching konten:", error);
      }
    };
    fetchKonten();
  }, []);

  return (
    <main>
      <div className="p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Data Konten</h1>
        <div className="bg-white p-4 shadow rounded-2xl">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border-b text-left font-bold">No</th>
                <th className="px-4 py-2 border-b text-left font-bold">
                  KONTEN
                </th>
                <th className="px-4 py-2 border-b text-left font-bold">
                  USERNAME
                </th>
                <th className="px-4 py-2 border-b text-left font-bold">
                  CAPTION
                </th>
                <th className="px-4 py-2 border-b text-left font-bold">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {konten.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-black">{index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    {item.type === "video" ? (
                      <video
                        src={`/api/viewKonten/${item.konten}`}
                        width={100}
                        height={100}
                        controls
                        className="object-cover w-30 h-30 rounded-xl aspect-square"
                      />
                    ) : (
                      <Image
                        src={`/api/viewKonten/${item.konten}`}
                        alt="Konten"
                        width={100}
                        height={100}
                        className="object-cover w-30 h-30 rounded-xl aspect-square"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-black">
                    {item.kreator.username}
                  </td>
                  <td className="px-4 py-2 border-b text-black">
                    {item.deskripsi || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(item.id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium border text-gray-500 border-gray-500"
                      >
                        <IoEyeSharp />
                        Lihat
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
                          isLoading
                            ? "bg-gray-300 text-gray-600"
                            : "bg-white text-red-600 border-2 border-red-600"
                        }`}
                      >
                        <FaTrashAlt />
                        {isLoading ? "Loading..." : "Hapus"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalKontenAdmin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contentId={selectedContentId}
        konten={konten}
      />
    </main>
  );
}

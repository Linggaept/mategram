/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function Subscriber() {
  const [subscriber, setSubscriber] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const response = await fetch("/api/admin/dataSubscriber");
        const data = await response.json();
        console.log(data);
        setSubscriber(data);
      } catch (error) {
        console.error("Error fetching subscriber data:", error);
      }
    };
    fetchSubscriber();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true); // Set loading state true saat proses penghapusan
    try {
      const response = await fetch("/api/admin/deleteSubscriber", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Kirim ID kreator yang akan dihapus
      });

      const data = await response.json(); // Mengambil respons dalam format JSON

      if (response.ok) {
        alert(data.message); // Tampilkan pesan sukses jika berhasil
        setSubscriber(subscriber.filter((item: any) => item.id !== id)); // Hapus kreator dari daftar
      } else {
        alert(data.message || "Gagal menghapus kreator"); // Tampilkan pesan error jika gagal
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus kreator");
    } finally {
      setIsLoading(false); // Set loading state false setelah selesai
    }
  };
  return (
    <div>
      <div className="p-4 text-black">
        <h1 className="text-black text-2xl font-bold mb-4">Data Subscriber</h1>
        <div className="p-4 w-full bg-white">
          <div className="bg-white rounded-2xl shadow p-4 flex items-center w-full">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                      No
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                      EMAIL
                    </th>
                    <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriber.map((item: any, index: number) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b border-gray-200 text-black">
                        {index + 1}
                      </td>

                      <td className="px-4 py-2 border-b border-gray-200 text-black">
                        {item.email}
                      </td>

                      <td className="px-4 py-2 border-b border-gray-200 text-black">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={isLoading}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
                              isLoading
                                ? "bg-gray-300 text-gray-600"
                                : "bg-white text-red-600 border border-red-600"
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
        </div>
      </div>
    </div>
  );
}

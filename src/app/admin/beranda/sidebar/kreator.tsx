/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function Kreator() {
  const [kreator, setKreator] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchKreator = async () => {
      try {
        const response = await fetch("/api/admin/dataKreator");
        if (response.ok) {
          const data = await response.json();
          setKreator(data);
        } else {
          console.error("Gagal mengambil data kreator");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchKreator();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/nonaktifkanKreator", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, statusAkun: !currentStatus }), // Kirim status yang dibalik
      });

      if (response.ok) {
        setKreator((prevKreator: any[]) =>
          prevKreator.map((item) =>
            item.id === id ? { ...item, statusAkun: !currentStatus } : item
          )
        );
        alert(
          !currentStatus
            ? "Kreator berhasil dinonaktifkan"
            : "Kreator berhasil diaktifkan"
        );
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status kreator");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/admin/deleteKreator", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Kirim ID kreator yang akan dihapus
      });

      if (response.ok) {
        alert("Kreator berhasil dihapus");
        setKreator(kreator.filter((item: any) => item.id !== id));
      } else {
        const { message } = await response.json();
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus kreator");
    }
  };

  return (
    <div className="p-4 text-black">
      <h1 className="text-black text-2xl font-bold mb-4">Data Kreator</h1>
      <div className="p-4 w-full bg-white">
        <h1 className="text-black text-2xl font-bold mb-4">Data Transaksi</h1>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center w-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                    No
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                    USERNAME
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                    EMAIL
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                    STATUS
                  </th>
                  <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {kreator.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b border-gray-200 text-black">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-black">
                      {item.username}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-black">
                      {item.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-black">
                      {item.statusAkun ? (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg">
                          Nonaktif
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg">
                          Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-black">
                      <div className="flex gap-2">
                        {item.statusAkun ? (
                          <button
                            onClick={() =>
                              handleToggleStatus(item.id, item.statusAkun)
                            }
                            disabled={isLoading}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              isLoading
                                ? "bg-gray-300 text-gray-600"
                                : "bg-white text-green-600 border-2 border-green-600"
                            }`}
                          >
                            {isLoading ? "Loading..." : "Aktifkan"}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleToggleStatus(item.id, item.statusAkun)
                            }
                            disabled={isLoading}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              isLoading
                                ? "bg-gray-300 text-gray-600"
                                : "bg-white text-red-600 border-2 border-red-600"
                            }`}
                          >
                            {isLoading ? "Loading..." : "Nonaktifkan"}
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium bg-white text-red-600 border border-red-600"
                        >
                          <FaTrashAlt />
                          Delete
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
  );
}

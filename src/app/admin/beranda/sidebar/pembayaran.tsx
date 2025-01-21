/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

interface Kreator {
  username: string;
}

interface Subscriber {
  email: string;
}
interface TransaksiProps {
  kreator: Kreator;
  subscriber: Subscriber;
  id: string;
  tanggal: string;
  totalTransaksi: number;
  paymentStatus: string;
  statusTransaksi: string;
}
export default function Transaksi() {
  const [transaksi, setTransaksi] = useState<TransaksiProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/dataTransaksi");
        const data = await response.json();
        setTransaksi(data.transaksi || []);
        console.log(data.transaksi || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const handlePaymentAction = async (id: string, action: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/updatePaymentStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update transaksi state setelah berhasil mengubah status
        setTransaksi((prevTransaksi) =>
          prevTransaksi.map((item) =>
            item.id === id
              ? {
                  ...item,
                  paymentStatus:
                    action === "bayar" ? "dibayar" : "belum dibayar",
                }
              : item
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="p-4 text-black">
      <h1 className="text-black text-2xl font-bold mb-4">Data Pembayaran</h1>
      <div className="p-4 w-full bg-white">
        <div className="bg-white rounded-2xl shadow p-4 flex items-center w-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    No
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    ID PEMBAYARAN
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    KREATOR
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    WAKTU
                  </th>

                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    TOTAL
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    STATUS
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi
                  .filter(
                    (item) =>
                      item.subscriber && item.statusTransaksi == "success"
                  )
                  .map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.id}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.kreator.username}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.tanggal}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.totalTransaksi}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.paymentStatus === "belum dibayar" ? (
                          <p className="text-yellow-500 bg-yellow-100 rounded-md px-1 py-1 text-sm font-medium justify-center flex">
                            Belum Dibayar
                          </p>
                        ) : (
                          <p className="text-blue-500 bg-blue-200 rounded-md px-1 py-1 text-sm font-medium justify-center flex">
                            Dibayar
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200 text-black">
                        {item.paymentStatus === "belum dibayar" ? (
                          <button
                            onClick={() =>
                              handlePaymentAction(item.id, "bayar")
                            }
                            disabled={isLoading}
                            className={` text-sm font-medium py-3 px-8 rounded-md ${
                              isLoading
                                ? `bg-gray-100 text-gray-400`
                                : `bg-blue-600 hover:bg-blue-700 text-white`
                            } `}
                          >
                            {isLoading ? "Loading..." : "Bayar"}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handlePaymentAction(item.id, "batalkan")
                            }
                            className={`text-sm font-medium py-3 px-8 rounded-md ${
                              isLoading
                                ? `bg-gray-100 text-gray-400`
                                : `bg-white hover:bg-red-700 hover:text-white text-red-600 border-2 border-red-600`
                            }`}
                          >
                            {isLoading ? "Loading..." : "Batalkan"}
                          </button>
                        )}
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

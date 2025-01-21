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

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="p-4 text-black">
      <h1 className="text-black text-2xl font-bold mb-4">Data Transaksi</h1>
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
                    ID TRANSAKSI
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    WAKTU
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    KREATOR
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    SUBSCRIBER
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    TOTAL
                  </th>
                  <th className="px-4 py-4 border border-gray-200 text-left text-black font-bold">
                    STATUS
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
                        {item.tanggal}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.kreator.username}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200 text-black">
                        {item.subscriber ? item.subscriber.email : ""}
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

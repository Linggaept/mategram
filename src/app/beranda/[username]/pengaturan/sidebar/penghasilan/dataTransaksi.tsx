/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Status style function (unchanged)
const getStatusStyle = (status: string) => {
  switch (status) {
    case "Sudah dibayar":
      return "bg-green-100 text-green-600";
    case "Belum dibayar":
      return "bg-yellow-100 text-yellow-600";
    case "Tidak dibayar":
      return "bg-red-100 text-red-600";
    default:
      return "";
  }
};

const DataTransaksi: React.FC = () => {
  const { username } = useParams();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`/api/dataTransaksi/${username}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTransactions(response.data); // Set data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransactions();
  }, [username]);

  return (
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
                  ID TRANSAKSI
                </th>
                <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                  WAKTU
                </th>
                <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                  TOTAL
                </th>
                <th className="px-4 py-2 border border-gray-200 text-left text-black font-bold">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {new Date(transaction.tanggal).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    Rp{transaction.totalTransaksi.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        transaction.statusTransaksi
                      )}`}
                    >
                      {transaction.statusTransaksi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTransaksi;

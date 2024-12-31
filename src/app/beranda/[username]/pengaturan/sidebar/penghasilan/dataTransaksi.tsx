import React from "react";

type Transaction = {
  no: number;
  id: string;
  waktu: string;
  total: string;
  status: "Sudah dibayar" | "Belum dibayar" | "Tidak dibayar";
};

const transactions: Transaction[] = [
  {
    no: 1,
    id: "#2406190089",
    waktu: "19 November 2024, 18:30",
    total: "Rp50.000",
    status: "Sudah dibayar",
  },
  {
    no: 2,
    id: "#2406190089",
    waktu: "19 November 2024, 10:30",
    total: "Rp50.000",
    status: "Sudah dibayar",
  },
  {
    no: 3,
    id: "#2406190089",
    waktu: "19 November 2024, 06:07",
    total: "Rp50.000",
    status: "Belum dibayar",
  },
  {
    no: 4,
    id: "#2406190089",
    waktu: "12 November 2024, 18:30",
    total: "Rp50.000",
    status: "Sudah dibayar",
  },
  {
    no: 5,
    id: "#2406190089",
    waktu: "08 November 2024, 18:30",
    total: "Rp50.000",
    status: "Tidak dibayar",
  },
  {
    no: 6,
    id: "#2406190089",
    waktu: "08 November 2024, 18:30",
    total: "Rp50.000",
    status: "Sudah dibayar",
  },
  {
    no: 7,
    id: "#2406190089",
    waktu: "19 Oktober 2024, 18:30",
    total: "Rp30.000",
    status: "Sudah dibayar",
  },
  {
    no: 8,
    id: "#2406190089",
    waktu: "19 Oktober 2024, 18:30",
    total: "Rp30.000",
    status: "Belum dibayar",
  },
  {
    no: 9,
    id: "#2406190089",
    waktu: "08 Oktober 2024, 18:30",
    total: "Rp30.000",
    status: "Sudah dibayar",
  },
  {
    no: 10,
    id: "#2406190089",
    waktu: "07 Oktober 2024, 18:30",
    total: "Rp30.000",
    status: "Sudah dibayar",
  },
];

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
  return (
    <div className="p-4 w-full">
      <h1 className="text-black text-2xl font-bold mb-4">Data Transaksi</h1>
      <div className="bg-white rounded-2xl shadow p-4 flex items-center w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto ">
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
              {transactions.map((transaction) => (
                <tr key={transaction.no} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {transaction.no}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {transaction.waktu}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    {transaction.total}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200 text-black">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
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

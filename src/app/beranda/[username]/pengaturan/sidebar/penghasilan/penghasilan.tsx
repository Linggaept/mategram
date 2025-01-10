/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Kreator {
  totalPenghasilanBulanIni: number;
  totalPenghasilanBulanLalu: number;
  totalSubscriber: number;
}

export default function PenghasilanPart() {
  const [kreator, setKreator] = useState<Kreator>({
    totalPenghasilanBulanIni: 0,
    totalPenghasilanBulanLalu: 0,
    totalSubscriber: 0,
  });

  const { username } = useParams();

  useEffect(() => {
    const fetchPenghasilan = async () => {
      try {
        const response = await axios.get(`/api/penghasilan/${username}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setKreator(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPenghasilan();
  }, []);

  return (
    <div className="p-4 bg-white w-full">
      <h1 className="text-black text-2xl font-bold mb-4">Penghasilan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Penghasilan Bulan Ini */}
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-md font-semibold">
              Total Penghasilan Bulan Ini
            </h2>
            <h3 className="text-black text-4xl font-bold">
              Rp. {kreator.totalPenghasilanBulanIni.toLocaleString("id-ID")}
            </h3>
            <p className="text-gray-400 text-xs font-normal">
              Penghasilan dari awal hingga akhir bulan ini
            </p>
          </div>
        </div>

        {/* Penghasilan Bulan Lalu */}
        <div className="bg-white rounded-2xl shadow p-4 flex items-center w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-black text-md font-semibold">
              Penghasilan Bulan Lalu
            </h2>
            <h3 className="text-black text-4xl font-bold">
              Rp. {kreator.totalPenghasilanBulanLalu.toLocaleString("id-ID")}
            </h3>
            <div className="flex justify-between items-center w-full ">
              <p className="text-gray-400 text-xs font-normal flex justify-start">
                Penghasilan ini telah dibayar bulan lalu
              </p>
              <p className="text-green-600 text-xs font-semibold bg-green-200 rounded-md p-1 flex items-center justify-center">
                Sudah dibayar
              </p>
            </div>
          </div>
        </div>

        {/* Total Subscriber */}
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-md font-semibold">
              Total Subscriber
            </h2>
            <h3 className="text-black text-4xl font-bold">
              {kreator.totalSubscriber}
            </h3>
            <p className="text-gray-400 text-xs font-normal">
              Berdasarkan total subscriber aktif bulan ini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

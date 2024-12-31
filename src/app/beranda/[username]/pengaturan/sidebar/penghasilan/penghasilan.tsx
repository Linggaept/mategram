export default function PenghasilanPart() {
  return (
    <div className="p-4">
      <h1 className="text-black text-2xl font-bold mb-4">Penghasilan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-md font-semibold">
              Total Penghasilan Bulan Ini
            </h2>
            <h3 className="text-black text-4xl font-bold">Rp. 9.000.000.000</h3>
            <p className="text-gray-400 text-xs font-normal">
              Penghasilan dari tanggal 26 Oktober - 25 November 2024
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-black text-md font-semibold">
              Penghasilan Bulan Lalu
            </h2>
            <h3 className="text-black text-4xl font-bold">Rp. 7.200.000.000</h3>
            <div className="flex justify-between items-center w-full ">
              <p className="text-gray-400 text-xs font-normal flex justify-start">
                Penghasilan dibayar pada 25 Oktober 2024
              </p>
              <p className="text-green-600 text-xs font-semibold bg-green-200 rounded-md p-1 flex items-center justify-center">
                Sudah dibayar
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-md font-semibold">
              Total Subscriber
            </h2>
            <h3 className="text-black text-4xl font-bold">180</h3>
            <p className="text-gray-400 text-xs font-normal">
              Berdasarkan orang yang subscribe bulan ini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Subscription() {
  return (
    <div className="flex flex-col gap-8">
      {/* Biaya Subscribtion */}
      <div className="bg-white rounded-2xl shadow">
        <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
          Biaya Subscribtion
        </h1>
        <form action="">
          <div className="flex items-center px-6 py-2 mt-4">
            <label
              htmlFor="biaya"
              className="text-black font-normal text-lg w-2/12"
            >
              Biaya Subscribtion
            </label>
            <input
              type="text"
              name="biaya"
              id="biaya"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>

          <div className="w-3/12 items-end flex justify-end py-4 mb-2">
            <button
              type="submit"
              className="py-2 px-8 rounded-3xl bg-blue-600 text-white font-semibold text-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      {/* Rekening */}
      <div className="bg-white rounded-2xl shadow">
        <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
          Rekening
        </h1>

        <div className="flex flex-col w-full mt-4">
          <div className="flex px-6 py-2 items-center">
            <label
              htmlFor="nama"
              className="text-black font-normal text-lg w-2/12"
            >
              Nama Rekening
            </label>
            <input
              type="text"
              name="namaRekening"
              id="namaRekening"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="flex px-6 py-2 items-center">
            <label
              htmlFor="nama"
              className="text-black font-normal text-lg w-2/12"
            >
              No. Rekening
            </label>
            <input
              type="text"
              name="noRekening"
              id="noRekening"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>

          <div className="w-3/12 items-end flex justify-end py-4 mb-2">
            <button
              type="submit"
              className="py-2 px-8 rounded-3xl bg-blue-600 text-white font-semibold text-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Password() {
  return (
    <div className="bg-white rounded-2xl shadow">
      <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
        Password
      </h1>
      <div className="w-full flex flex-col mt-4">
        <form action="" className="flex flex-col gap-4">
          <div className="flex px-4 items-center">
            <label htmlFor="" className="text-black font-normal text-lg w-2/12">
              Password lama
            </label>
            <input
              type="password"
              name="passwordLama"
              id="passwordLama"
              className="w-full bg-white border border-gray-600 text-black rounded-full py-2 px-4"
            />
          </div>
          <div className="flex px-4 items-center">
            <label htmlFor="" className="text-black font-normal text-lg w-2/12">
              Password Baru
            </label>
            <input
              type="password"
              name="passwordBaru"
              id="passwordBaru"
              className="w-full bg-white border border-gray-600 text-black rounded-full py-2 px-4"
            />
          </div>
          <div className="flex px-4 items-center">
            <label htmlFor="" className="text-black font-normal text-lg w-2/12">
              Tulis ulang password baru
            </label>
            <input
              type="password"
              name="tulisPasswordBaru"
              id="tulisPasswordBaru"
              className="w-full bg-white border border-gray-600 text-black rounded-full py-2 px-4"
            />
          </div>

          <div className="w-3/12 items-end flex justify-end py-2 mb-4">
            <button
              type="submit"
              className="py-2 px-8 rounded-3xl bg-blue-600 text-white font-semibold text-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfilPart() {
  return (
    <div className="bg-white rounded-2xl shadow">
      <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
        Profil
      </h1>
      <div className="w-full flex flex-col">
        <div className="flex mt-4">
          <p className="py-2 px-6 text-black font-normal text-lg w-2/12">
            Username
          </p>
          <p className="py-2 px-6 text-black font-normal text-lg w-full">
            Username
          </p>
        </div>
        <form action="">
          <div className="flex py-2 px-6 items-center">
            <label
              htmlFor="nama"
              className=" text-black font-normal text-lg w-2/12"
            >
              Nama
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="flex py-2 px-6 items-center">
            <label
              htmlFor="email"
              className=" text-black font-normal text-lg w-2/12"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="flex py-2 px-6 items-center">
            <label
              htmlFor="fotoProfil"
              className=" text-black font-normal text-lg w-2/12"
            >
              Foto Profil
            </label>
            <input
              type="file"
              name="fotoProfil"
              id="fotoProfil"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="flex py-2 px-6 items-center">
            <label
              htmlFor="fotoBanner"
              className=" text-black font-normal text-lg w-2/12"
            >
              Foto Banner
            </label>
            <input
              type="file"
              name="fotoBanner"
              id="fotoBanner"
              className="rounded-full w-full py-2 px-4 border border-gray-400 bg-white text-black"
            />
          </div>
          <div className="flex py-2 px-6 items-center">
            <label
              htmlFor="deskripsi"
              className=" text-black font-normal text-lg w-2/12"
            >
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              id="deskripsi"
              className="rounded-3xl w-full py-2 px-4 border border-gray-400 bg-white text-black"
            ></textarea>
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
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function login() {
  return (
    <div className="xl:p-20 p-4">
      <main className="flex flex-col mx-auto">
        <div className="flex items-center mx-auto py-10">
          <Image src="/Logo.png" alt="Logo" width={30} height={30} />
          <h1 className="font-semibold text-center text-2xl ml-2">Mategram</h1>
        </div>

        <div className="flex flex-col mx-auto xl:p-10 p-6 border border-gray-300 rounded-xl md:w-4/12 w-3/4">
          <h1 className="font-semibold text-center text-3xl">Masuk</h1>
          <div className="flex gap-1 text-center justify-center mx-auto pb-6">
            <p className="text-center text-sm font-normal">
              Belum punya akun Mategram?{" "}
            </p>
            <Link
              href="/daftar"
              className="text-blue-600 text-center text-sm font-semibold hover:text-blue-500 duration-150"
            >
              Daftar
            </Link>
          </div>

          <form action="">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-md">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Masukan email"
                className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <label htmlFor="password" className="font-medium text-md">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Masukan Password"
                className="border border-gray-300 rounded-3xl text-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button className="bg-blue-600 text-white text-md font-semibold rounded-3xl px-6 py-2 mt-6 w-full hover:bg-blue-700 duration-150">
              Masuk
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

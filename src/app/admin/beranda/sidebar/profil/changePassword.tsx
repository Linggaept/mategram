import { useState } from "react";
import { useParams } from "next/navigation";
export default function ChangePassword() {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [tulisPasswordBaru, setTulisPasswordBaru] = useState("");
  const [message, setMessage] = useState("");

  const { username } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi password baru
    if (passwordBaru !== tulisPasswordBaru) {
      setMessage("Password baru dan konfirmasi password tidak sama.");
      return;
    }

    try {
      const response = await fetch(`/api/changePassword/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passwordLama,
          passwordBaru,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password berhasil diubah.");
      } else {
        setMessage(data.error || "Terjadi kesalahan.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan pada server.");
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow">
        <h1 className="p-6 text-black font-bold text-lg border-b border-gray-200">
          Password
        </h1>
        <div className="w-full flex flex-col mt-4 p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="block md:flex px-4 items-center">
              <label
                htmlFor="passwordLama"
                className="text-black font-normal text-lg w-2/12"
              >
                Password lama
              </label>
              <input
                type="password"
                name="passwordLama"
                id="passwordLama"
                value={passwordLama}
                onChange={(e) => setPasswordLama(e.target.value)}
                className="w-full bg-white border border-gray-600 text-black rounded-full py-2 px-4"
              />
            </div>
            <div className="block md:flex px-4 items-center">
              <label
                htmlFor="passwordBaru"
                className="text-black font-normal text-lg w-2/12"
              >
                Password Baru
              </label>
              <input
                type="password"
                name="passwordBaru"
                id="passwordBaru"
                value={passwordBaru}
                onChange={(e) => setPasswordBaru(e.target.value)}
                className="w-full bg-white border border-gray-600 text-black rounded-full py-2 px-4"
              />
            </div>
            <div className="block md:flex px-4 items-center">
              <label
                htmlFor="tulisPasswordBaru"
                className="text-black font-normal text-lg w-2/12"
              >
                Tulis ulang password baru
              </label>
              <input
                type="password"
                name="tulisPasswordBaru"
                id="tulisPasswordBaru"
                value={tulisPasswordBaru}
                onChange={(e) => setTulisPasswordBaru(e.target.value)}
                className="w-full bg-white border border-gray-600 text-black rounded-full py-2 px-4"
              />
            </div>
            {message && (
              <div className="px-4 text-red-500 font-medium text-sm">
                {message}
              </div>
            )}
            <div className="w-11/12 md:w-3/12 items-end flex justify-end py-2 mb-4">
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
    </div>
  );
}

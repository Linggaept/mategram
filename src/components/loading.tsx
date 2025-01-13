import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {/* Spinner */}
      <div className="absolute animate-spin rounded-full h-44 w-44 border-b-4 border-blue-600"></div>

      {/* Logo and Text */}
      <div className="flex gap-2 justify-center items-center z-10">
        <Image src="/Logo.png" alt="Logo" width={28} height={28} />
        <span className="font-bold text-center text-2xl text-blue-600">
          Mategram
        </span>
      </div>
    </div>
  );
}

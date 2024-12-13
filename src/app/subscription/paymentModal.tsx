/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/modal";
import Image from "next/image";
import { CiCircleCheck } from "react-icons/ci";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  kreator: any;
}
export const PaymentModal = ({
  isOpen,
  onClose,
  kreator,
}: PaymentModalProps) => {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <OverlayOne />
      <ModalContent
        className="p-10 min-h-screen justify-center absolute z-50 w-full"
        style={{ zIndex: 100 }}
      >
        <ModalBody className="mx-auto flex justify-center bg-white rounded-3xl  w-11/12 md:w-1/2 lg:w-1/3">
          <div className="w-full flex flex-col justify-center px-5 py-6 md:px-10 md:py-12">
            <div className="flex flex-col gap-4">
              <Image
                src={`/fotoProfil/${kreator?.fotoProfil}`}
                alt={`/fotoProfil/${kreator?.fotoProfil}`}
                width={400}
                height={400}
                className="mx-auto rounded-full aspect-square w-28 h-28 object-cover border-4 border-blue-600"
              />
              <h2 className="text-xl font-bold mb-5 text-black w-full text-center">
                Subscribe <span className="text-blue-600">{kreator?.nama}</span>
              </h2>
            </div>
            <p className="text-black text-xl md:text-3xl font-bold mb-3">
              Rp. {kreator?.biayaSubscription}/bulan
            </p>
            <div className="flex flex-col gap-1">
              <i className="flex gap-2 items-center ">
                <CiCircleCheck className="text-blue-600 text-xs md:text-md" />
                <span className="text-gray-600 text-xs md:text-md">
                  Berikan dukungan kepada kreator
                </span>
              </i>
              <i className="flex gap-2  items-center ">
                <CiCircleCheck className="text-blue-600 text-xs md:text-md" />
                <span className="text-gray-600 text-xs md:text-md">
                  Dapatkan konten eksklusif dari kreator
                </span>
              </i>
              <i className="flex gap-2  items-center ">
                <CiCircleCheck className="text-blue-600 text-xs md:text-md" />
                <span className="text-gray-600 text-xs md:text-md">
                  Nikmati konten tanpa terganggu oleh iklan
                </span>
              </i>
              <i className="flex gap-2  items-center ">
                <CiCircleCheck className="text-blue-600 text-xs md:text-md" />
                <span className="text-gray-600 text-xs md:text-md">
                  Tidak perlu daftar akun dan login
                </span>
              </i>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col mt-5 gap-2">
                <label
                  htmlFor="text"
                  className="text-black font-medium text-md"
                >
                  Bayar
                </label>
                <input
                  type="text"
                  id="bayar"
                  placeholder="Masukkan text nominal"
                  className="border border-gray-300 rounded-3xl text-black px-3 py-2 text-md md:text-lg mb-2 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white  rounded-full w-full py-2 text-md md:text-lg font-semibold justify-center flex"
                >
                  Bayar
                </button>
              </div>
            </form>
          </div>
        </ModalBody>
        <div className="absolute top-8 right-8">
          <ModalCloseButton />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
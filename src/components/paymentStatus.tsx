import { useEffect, useState } from "react";

interface PaymentStatusProps {
  orderId: string;
}

const PaymentStatus = ({ orderId }: PaymentStatusProps) => {
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `/api/transaction/status?orderId=${orderId}`
        );
        const data = await response.json();
        if (response.ok) {
          setStatus(data.statusTransaksi);
        } else {
          setStatus("Gagal mendapatkan status pembayaran.");
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        setStatus("Terjadi kesalahan.");
      }
    };

    fetchStatus();
  }, [orderId]);

  return (
    <div>
      <h2>Status Pembayaran:</h2>
      <p>{status}</p>
    </div>
  );
};

export default PaymentStatus;

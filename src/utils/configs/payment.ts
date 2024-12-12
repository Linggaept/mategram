import { MidtransClient } from "midtrans-node-client";

// Initialize the Snap instance from Midtrans
export const snap = new MidtransClient.Snap({
  isProduction: process.env.MIDTRANS_DEVELOPMENT === "true", // Determine if it's production environment
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// types/midtrans-client.d.ts
declare module 'midtrans-client' {
    // Definisikan tipe dasar yang Anda butuhkan dari midtrans-client
    export class Snap {
      setServerKey(SERVER_KEY: string) {
          throw new Error("Method not implemented.");
      }
      constructor();
      createTransaction(request: any): Promise<any>;
    }
  
    // Tambahkan lebih banyak deklarasi sesuai kebutuhan Anda
  }
  
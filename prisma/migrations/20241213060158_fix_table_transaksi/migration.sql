-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_kreatorId_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_subscriberId_fkey";

-- AlterTable
ALTER TABLE "Transaksi" ALTER COLUMN "kreatorId" DROP NOT NULL,
ALTER COLUMN "subscriberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_kreatorId_fkey" FOREIGN KEY ("kreatorId") REFERENCES "Kreator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

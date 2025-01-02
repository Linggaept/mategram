/*
  Warnings:

  - You are about to drop the column `rekening` on the `Kreator` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rekeningId]` on the table `Kreator` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Kreator" DROP COLUMN "rekening",
ADD COLUMN     "rekeningId" TEXT;

-- CreateTable
CREATE TABLE "Rekening" (
    "id" TEXT NOT NULL,
    "namaRekening" TEXT NOT NULL,
    "nomorRekening" TEXT NOT NULL,

    CONSTRAINT "Rekening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kreator_rekeningId_key" ON "Kreator"("rekeningId");

-- AddForeignKey
ALTER TABLE "Kreator" ADD CONSTRAINT "Kreator_rekeningId_fkey" FOREIGN KEY ("rekeningId") REFERENCES "Rekening"("id") ON DELETE SET NULL ON UPDATE CASCADE;

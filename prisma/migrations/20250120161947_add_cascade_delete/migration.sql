-- DropForeignKey
ALTER TABLE "Konten" DROP CONSTRAINT "Konten_kreatorId_fkey";

-- AddForeignKey
ALTER TABLE "Konten" ADD CONSTRAINT "Konten_kreatorId_fkey" FOREIGN KEY ("kreatorId") REFERENCES "Kreator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

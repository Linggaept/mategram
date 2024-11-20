-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fotoProfil" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kreator" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fotoProfil" TEXT,
    "fotoBanner" TEXT,
    "deskripsi" TEXT,
    "statusAkun" BOOLEAN NOT NULL DEFAULT false,
    "rekening" TEXT,
    "biayaSubscription" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Kreator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Konten" (
    "id" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "jenisKonten" TEXT NOT NULL,
    "deskripsi" TEXT,
    "kreatorId" TEXT NOT NULL,

    CONSTRAINT "Konten_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalTransaksi" DOUBLE PRECISION NOT NULL,
    "statusTransaksi" TEXT NOT NULL,
    "kreatorId" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "kodeSubscription" TEXT NOT NULL,
    "statusSubscription" TEXT NOT NULL,
    "kreatorId" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "transaksiId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PembayaranKreator" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalPembayaran" DOUBLE PRECISION NOT NULL,
    "statusPembayaran" TEXT NOT NULL,
    "kreatorId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "PembayaranKreator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kreator_username_key" ON "Kreator"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Kreator_email_key" ON "Kreator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- AddForeignKey
ALTER TABLE "Konten" ADD CONSTRAINT "Konten_kreatorId_fkey" FOREIGN KEY ("kreatorId") REFERENCES "Kreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_kreatorId_fkey" FOREIGN KEY ("kreatorId") REFERENCES "Kreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_kreatorId_fkey" FOREIGN KEY ("kreatorId") REFERENCES "Kreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembayaranKreator" ADD CONSTRAINT "PembayaranKreator_kreatorId_fkey" FOREIGN KEY ("kreatorId") REFERENCES "Kreator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembayaranKreator" ADD CONSTRAINT "PembayaranKreator_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

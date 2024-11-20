import { PrismaClient } from "@prisma/client";

// Gunakan deklarasi global yang sudah dibuat
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;

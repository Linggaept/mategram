import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Kreator ID is required" });
    }

    try {
      await prisma.kreator.delete({
        where: { id },
      });

      res.status(200).json({ message: "Kreator berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: "Gagal menghapus kreator", error });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

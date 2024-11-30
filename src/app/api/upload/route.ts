/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import prisma from "../../../../lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Ambil kreatorId terlebih dahulu
    const kreatorId = formData.get("kreatorId")?.toString();

    if (!kreatorId) {
      return NextResponse.json({ error: "KreatorId wajib disertakan." }, { status: 400 });
    }

    // Ambil file dari formData
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    // Convert file menjadi Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;

    // Tentukan path direktori penyimpanan
    const uploadDir = path.join(process.cwd(), "public/konten");
    const filePath = path.join(uploadDir, filename);

    // Simpan file ke direktori public/konten
    await writeFile(filePath, buffer);

    // Buat URL untuk file yang diupload
    const fileUrl = `${filename}`;

    // Ambil deskripsi dari formData
    const description = formData.get("description")?.toString() || "";

    // Simpan data ke database
    const konten = await prisma.konten.create({
      data: {
        konten: fileUrl, // Path file
        deskripsi: description,
        kreatorId: kreatorId, // Pastikan ID kreator valid
      },
    });

    return NextResponse.json(
      { message: "Konten berhasil diunggah.", konten },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred while uploading content:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengunggah konten." },
      { status: 500 }
    );
  }
};

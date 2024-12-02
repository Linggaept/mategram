/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
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
    const uploadDir = path.join(process.cwd(), "konten");
    
    // Pastikan direktori file_konten sudah ada
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);

    // Simpan file ke direktori file_konten
    await writeFile(filePath, buffer);

    // Tentukan tipe konten berdasarkan ekstensi file
    const fileExtension = path.extname(file.name).toLowerCase();
    let fileType = "image"; // Default ke gambar

    // Cek ekstensi file, jika video maka set type ke 'video'
    if ([".mp4", ".avi", ".mov", ".mkv"].includes(fileExtension)) {
      fileType = "video";
    }

    // Simpan data ke database
    const konten = await prisma.konten.create({
      data: {
        konten: filename, // Nama file
        deskripsi: formData.get("description")?.toString() || "",
        kreatorId, // Pastikan ID kreator valid
        type: fileType, // Set tipe konten
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

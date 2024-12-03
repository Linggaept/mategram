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
      return NextResponse.json(
        { error: "KreatorId wajib disertakan." },
        { status: 400 }
      );
    }

    // Ambil file dari formData
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "File tidak ditemukan." },
        { status: 400 }
      );
    }

    // Convert file menjadi Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;

    // Tentukan path direktori penyimpanan
    const uploadDir = path.join(process.cwd(), "konten");

    // Pastikan direktori sudah ada
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);

    // Simpan file ke direktori
    await writeFile(filePath, buffer);

    // Tentukan tipe konten berdasarkan ekstensi file
    const fileExtension = path.extname(file.name).toLowerCase();
    const supportedImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const supportedVideoExtensions = [".mp4", ".avi", ".mov", ".mkv"];

    let fileType = ""; // Akan ditentukan sesuai tipe file

    if (supportedImageExtensions.includes(fileExtension)) {
      fileType = "image";
    } else if (supportedVideoExtensions.includes(fileExtension)) {
      fileType = "video";
    } else {
      return NextResponse.json(
        {
          error:
            "Tipe file tidak didukung. Unggah gambar atau video yang valid.",
        },
        { status: 400 }
      );
    }

    // Simpan data ke database
    const konten = await prisma.konten.create({
      data: {
        konten: `${filename}`, // Path file relatif untuk akses publik
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

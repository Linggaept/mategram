/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import prisma from "../../../../lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const kreatorId = formData.get("kreatorId")?.toString();

    if (!kreatorId) {
      return NextResponse.json(
        { error: "KreatorId wajib disertakan." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "File tidak ditemukan." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;

    const uploadDir = path.join(process.cwd(), "konten");

    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const fileExtension = path.extname(file.name).toLowerCase();
    const supportedImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const supportedVideoExtensions = [".mp4", ".avi", ".mov", ".mkv"];

    let fileType = ""; 

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

    const konten = await prisma.konten.create({
      data: {
        konten: `${filename}`, 
        deskripsi: formData.get("description")?.toString() || "",
        kreatorId, 
        type: fileType, 
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

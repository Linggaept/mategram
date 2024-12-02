/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import mime from "mime-types"; // Pastikan untuk menambahkan dependensi mime-types

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{ filename: string }>;
  }
) {
  const { filename } = await context.params;

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "konten", filename);
    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const mimeType = mime.lookup(filePath) || "application/octet-stream"; // Menentukan MIME type berdasarkan file
    const fileStream = fs.createReadStream(filePath);

    const headers = new Headers({
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Type": mimeType, // Menggunakan MIME type yang benar
    });

    return new NextResponse(fileStream as never, { headers });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

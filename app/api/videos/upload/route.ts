import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb/mongo";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const video = formData.get("video") as File | null;
    const title = formData.get("title") as string;
    const visibility = formData.get("visibility") as string;
    const madeForKids = formData.get("made_for_kids") === "yes";

    if (!video || !title) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    //  Generate unique filename
    const videoBuffer = Buffer.from(await video.arrayBuffer());
    const videoExt = path.extname(video.name);
    const videoName = crypto.randomUUID() + videoExt;

    const videoPath = path.join(
      process.cwd(),
      "public/uploads/videos",
      videoName,
    );

    await writeFile(videoPath, videoBuffer);

    const thumbnail =
      (formData.get("custom_thumbnail") as File) ||
      (formData.get("generated_thumbnail") as File) ||
      null;

    let thumbnailUrl = null;

    if (thumbnail) {
      const thumbBuffer = Buffer.from(await thumbnail.arrayBuffer());
      const thumbName = crypto.randomUUID() + ".jpg";

      const thumbPath = path.join(
        process.cwd(),
        "public/uploads/thumbnails",
        thumbName,
      );

      await writeFile(thumbPath, thumbBuffer);

      thumbnailUrl = `/uploads/thumbnails/${thumbName}`;
    }

    //  Save metadata to MongoDB
    const client = await clientPromise;
    const db = client.db();

    await db.collection("videos").insertOne({
      title,
      videoUrl: `/uploads/videos/${videoName}`,
      visibility,
      madeForKids,
      thumbnailUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}

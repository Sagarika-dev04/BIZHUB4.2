import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { BusinessCard } from '@/models/BusinessCard';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryUpload = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "business_cards" }, (err, result) => {
        if (err || !result) return reject(err);
        resolve({ secure_url: result.secure_url });
      }).end(buffer);
    });

    const newCard = new BusinessCard({
      name: formData.get("name"),
      category: formData.get("category"),
      description: formData.get("description"),
      address: formData.get("address"),
      email: formData.get("email"),
      website: formData.get("website"),
      phone: formData.get("phone"),
      openingHours: formData.get("openingHours"),
      image: cloudinaryUpload.secure_url,
      contact: formData.get("phone"),
      createdBy: session.user.id, 
    });

    await connectToDB();
    await newCard.save();

    return NextResponse.json({ message: "Business added", id: newCard._id }, { status: 201 });
  } catch (err) {
    console.error("Error adding business:", err);
    return NextResponse.json({ error: "Failed to add business" }, { status: 500 });
  }
}

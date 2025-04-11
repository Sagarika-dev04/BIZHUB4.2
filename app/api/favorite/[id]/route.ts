import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //Extracting the ID from the URL
    const url = new URL(req.url);
    const businessIdStr = url.pathname.split("/").pop();

    if (!businessIdStr) {
      return NextResponse.json({ error: "Missing business ID" }, { status: 400 });
    }

    const isAlreadyFavorite = user.favorites.some(
      (fav: mongoose.Types.ObjectId) => fav.toString() === businessIdStr
    );

    if (!isAlreadyFavorite) {
      user.favorites.push(new mongoose.Types.ObjectId(businessIdStr));
      await user.save();
    }

    return new Response(null, { status: 204 });

  } catch (error) {
    console.error("Error updating favorites:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

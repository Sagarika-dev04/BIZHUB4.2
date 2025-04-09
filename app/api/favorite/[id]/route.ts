import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // ensure this is at the top

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  try {
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Add to favorites
    if (!user.favorites.some((fav: mongoose.Types.ObjectId) => fav.toString() === params.id)) {
      user.favorites.push(params.id);
      await user.save();
    }


    return NextResponse.json({ message: "Added to favorites" });
  } catch (error) {
    console.error("Error updating favorites:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

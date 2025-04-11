import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({ isFavorite: false });

  const user = await User.findById(session.user.id);

  const isFavorite = user.favorites?.some((fav: mongoose.Types.ObjectId) => fav.toString() === params.id);

  return NextResponse.json({ isFavorite: !!isFavorite });
}

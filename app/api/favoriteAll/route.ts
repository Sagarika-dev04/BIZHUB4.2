import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json([]);

  const user = await User.findById(session.user.id).populate("favorites");

  return NextResponse.json(user.favorites || []);
}

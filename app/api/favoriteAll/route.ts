import { connectToDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { BusinessCard } from "@/models/BusinessCard"; // needed for .populate to work

export async function GET() {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session || session.user.userType !== "General User") {
      return NextResponse.json([], { status: 401 });
    }

    const user = await User.findById(session.user.id).populate({
        path: "favorites",
        model: "BusinessCard", // explicitly set the correct model name
      });
      

    if (!user) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(user.favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json([], { status: 500 });
  }
}

import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, userType } = await req.json();
    await connectToDB();

   

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists:", email);  //Debug log
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, userType });

    console.log("User created:", newUser);  // Debug log
    return NextResponse.json({ message: "User created" }, { status: 201 });

  } catch (err) {
    console.error("Signup API error:", err);  // Error log
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


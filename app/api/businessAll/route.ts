import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import {BusinessCard} from "@/models/BusinessCard";

export async function GET() {
  try {
    await connectToDB();
    const businesses = await BusinessCard.find({});
    return NextResponse.json(businesses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch businesses",detauils: error }, { status: 500 });
  }
}

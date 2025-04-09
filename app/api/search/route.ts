import { connectToDB } from "@/lib/db";
import {BusinessCard} from "@/models/BusinessCard";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  await connectToDB();
  const results = await BusinessCard.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
    ],
  });

  return NextResponse.json(results);
}

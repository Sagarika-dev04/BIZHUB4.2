import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { BusinessCard } from "@/models/BusinessCard";
//import { NextApiRequest } from "next";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  await connectToDB();
  const data = await req.json();

  try {
    const updated = await BusinessCard.findByIdAndUpdate(context.params.id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Business updated successfully", updated });
  } catch (err) {
    return NextResponse.json({ message: "Update failed", details: err }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  await connectToDB();

  try {
    const deleted = await BusinessCard.findByIdAndDelete(context.params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Business deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Delete failed", details: err }, { status: 500 });
  }
}

// app/api/business/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { BusinessCard } from "@/models/BusinessCard";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();
  const data = await req.json();

  try {
    const updated = await BusinessCard.findByIdAndUpdate(params.id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Business updated successfully", updated });
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await connectToDB();
  
    try {
      await BusinessCard.findByIdAndDelete(params.id);
      return NextResponse.json({ message: "Business deleted successfully" });
    } catch (err) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
  }
  

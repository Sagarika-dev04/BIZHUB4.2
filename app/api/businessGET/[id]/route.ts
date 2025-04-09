import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { BusinessCard } from '@/models/BusinessCard';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extracts ID from URL

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const business = await BusinessCard.findById(id).populate("createdBy");

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    return NextResponse.json(business, { status: 200 });

  } catch (error) {
    console.error('[GET Business by ID Error]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

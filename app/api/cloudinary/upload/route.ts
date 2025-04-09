import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('image') as File;

  if (!file) {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ folder: 'business_cards' }, (error, result) => {
        if (error || !result) {
          resolve(NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ url: result.secure_url }, { status: 200 }));
        }
      })
      .end(buffer);
  });
}


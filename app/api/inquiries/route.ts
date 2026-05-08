import { NextResponse } from 'next/server';
import { createInquiry } from '@/lib/store';
import { inquirySchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = inquirySchema.parse(body);
    const inquiry = await createInquiry(payload);
    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid inquiry payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { listTransportSchedules, scheduleTransport } from '@/lib/store';
import { transportSchema } from '@/lib/validation';

export async function GET() {
  const schedules = await listTransportSchedules();
  return NextResponse.json({ schedules }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = transportSchema.parse(body);
    const result = await scheduleTransport(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid transport payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

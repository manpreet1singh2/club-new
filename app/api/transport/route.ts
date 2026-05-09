import { NextResponse } from 'next/server';
import { listTransportSchedules, scheduleTransport, updateTransportScheduleStatus } from '@/lib/store';
import { transportSchema, transportStatusSchema } from '@/lib/validation';

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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const payload = transportStatusSchema.parse(body);
    const result = await updateTransportScheduleStatus(payload);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid transport update payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

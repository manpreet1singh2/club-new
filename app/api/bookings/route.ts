import { NextResponse } from 'next/server';
import { createBooking, listBookings } from '@/lib/store';
import { bookingSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number(searchParams.get('pageSize') ?? '10');
  const venueId = searchParams.get('venueId') ?? 'all';
  const eventId = searchParams.get('eventId') ?? 'all';
  const status = (searchParams.get('status') ?? 'all') as 'all' | 'pending' | 'confirmed' | 'waitlist' | 'cancelled';
  const data = await listBookings({ venueId, eventId, status, page, pageSize });
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = bookingSchema.parse(body);
    const result = await createBooking(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid booking payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

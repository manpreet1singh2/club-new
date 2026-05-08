import { NextResponse } from 'next/server';
import { listBookings, registerAdvancePayment } from '@/lib/store';
import { paymentSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId') ?? 'all';
  const bookings = await listBookings({ status: 'all', page: 1, pageSize: 1000 });
  const items = bookingId === 'all' ? bookings.items : bookings.items.filter((booking) => booking.id === bookingId);
  return NextResponse.json({ payments: items.map((booking) => ({ bookingId: booking.id, advanceAmount: booking.advanceAmount ?? 0, paidAmount: booking.paidAmount ?? 0, paymentStatus: booking.paymentStatus ?? 'pending' })) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = paymentSchema.parse(body);
    const result = await registerAdvancePayment(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid payment payload';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

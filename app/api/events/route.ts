import { NextResponse } from 'next/server';
import { listEvents } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const venueId = searchParams.get('venueId') ?? 'all';
  const events = await listEvents({ venueId });
  return NextResponse.json({ events }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

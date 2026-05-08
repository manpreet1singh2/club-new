import { NextResponse } from 'next/server';
import { listVenues } from '@/lib/store';
import { venueFiltersSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = venueFiltersSchema.parse({
    city: searchParams.get('city') ?? 'all',
    priceTier: searchParams.get('priceTier') ?? 'all',
    capacity: searchParams.get('capacity') ?? 0
  });
  const venues = await listVenues(filters);
  return NextResponse.json({ venues }, { headers: { 'Cache-Control': 'public, max-age=120' } });
}

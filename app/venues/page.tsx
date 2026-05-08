import { VenueCard } from '@/components/venue-card';
import { listVenues } from '@/lib/store';
import { venueFiltersSchema } from '@/lib/validation';

export default async function VenuesPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const parsed = venueFiltersSchema.parse({
    city: typeof searchParams.city === 'string' ? searchParams.city : 'all',
    priceTier: typeof searchParams.priceTier === 'string' ? searchParams.priceTier : 'all',
    capacity: typeof searchParams.capacity === 'string' ? searchParams.capacity : 0
  });

  const venues = await listVenues(parsed);
  const cities = ['all', 'Mumbai', 'Delhi', 'Bengaluru', 'Goa', 'Hyderabad'];
  const tiers = ['all', 'VIP', 'Premium', 'Standard'];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Venues</p>
        <h1 className="section-title">Search the nightlife inventory</h1>
        <p className="section-copy">Filter by city, capacity, and pricing tier to locate the best venue for reservations, buyouts, or recurring events.</p>
      </div>
      <form className="mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 md:grid-cols-3">
        <label>
          <span className="mb-2 block text-sm text-slate-300">City</span>
          <select name="city" defaultValue={parsed.city} className="field">
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Price tier</span>
          <select name="priceTier" defaultValue={parsed.priceTier} className="field">
            {tiers.map((tier) => <option key={tier} value={tier}>{tier}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Minimum capacity</span>
          <input name="capacity" type="number" min={0} defaultValue={parsed.capacity} className="field" />
        </label>
        <button className="btn-primary md:col-span-3">Apply filters</button>
      </form>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </div>
    </div>
  );
}

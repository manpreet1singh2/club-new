import { EventCard } from '@/components/event-card';
import { listEvents, listVenues } from '@/lib/store';
import { eventFiltersSchema } from '@/lib/validation';

export default async function EventsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const parsed = eventFiltersSchema.parse({ venueId: typeof searchParams.venueId === 'string' ? searchParams.venueId : 'all' });
  const [events, venues] = await Promise.all([listEvents(parsed), listVenues()]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Events</p>
        <h1 className="section-title">Program calendar and ticket inventory</h1>
        <p className="section-copy">Browse upcoming club nights, set lists, and premium experiences. Filters keep the view useful for ops teams and guests alike.</p>
      </div>
      <form className="mt-8 max-w-md rounded-[28px] border border-white/10 bg-white/5 p-5">
        <label>
          <span className="mb-2 block text-sm text-slate-300">Venue filter</span>
          <select name="venueId" defaultValue={parsed.venueId} className="field">
            <option value="all">all</option>
            {venues.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
          </select>
        </label>
        <button className="btn-primary mt-4 w-full">Apply filters</button>
      </form>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {events.map((event) => <EventCard key={event.id} event={event} venue={venues.find((venue) => venue.id === event.venueId)} />)}
      </div>
    </div>
  );
}

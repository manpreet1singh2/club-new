import type { Event, Venue } from '@/lib/types';

export function EventCard({ event, venue }: { event: Event; venue?: Venue | null }) {
  const booked = event.featured ? 'Featured' : 'Live tonight';
  const venueName = venue?.name ?? 'Venue';

  return (
    <article className="panel-soft p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="chip">{booked}</span>
          <h3 className="mt-4 text-2xl font-semibold text-white">{event.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{venueName} · {event.genre}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-white">₹{event.ticketPrice.toLocaleString('en-IN')}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Entry price</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{event.description}</p>
      <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <span className="chip">{new Date(event.startAt).toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
        <span className="chip">Capacity {event.capacity}</span>
        <span className="chip">Age {event.ageLimit}+</span>
        <span className="chip">Dress code: {event.dressCode}</span>
      </div>
    </article>
  );
}

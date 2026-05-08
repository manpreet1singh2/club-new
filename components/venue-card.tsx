import type { Venue } from '@/lib/types';

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="panel overflow-hidden">
      <div className="flex h-40 items-end justify-between bg-gradient-to-br from-night-800 via-night-700 to-velvet-800 p-5">
        <span className="chip border-white/20 bg-white/10 text-white">{venue.city}</span>
        <div className="text-right">
          <p className="text-3xl font-semibold text-white">{venue.rating.toFixed(1)}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Rating</p>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{venue.name}</h3>
            <p className="text-sm text-slate-400">{venue.neighborhood} · {venue.priceTier}</p>
          </div>
          <span className="chip">{venue.capacity} pax</span>
        </div>
        <p className="text-sm leading-6 text-slate-300">{venue.vibe}</p>
        <div className="flex flex-wrap gap-2">
          {venue.features.map((feature) => (
            <span key={feature} className="chip">{feature}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>{venue.openingHours}</span>
          <span>Cover ₹{venue.coverCharge.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </article>
  );
}

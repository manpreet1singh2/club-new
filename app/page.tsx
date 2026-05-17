import Link from 'next/link';
import { BookingForm } from '@/components/booking-form';
import { EventCard } from '@/components/event-card';
import { MetricsGrid } from '@/components/metrics-grid';
import { VenueCard } from '@/components/venue-card';
import { getDashboardMetrics, getTopBookedEvents, listEvents, listSolutions } from '@/lib/store';

export default async function HomePage() {
  const [venues, events, metrics, topBooked] = await Promise.all([
    listVenues(),
    listEvents(),
    getDashboardMetrics(),
    getTopBookedEvents()
  ]);

  const featuredVenues = venues.slice(0, 4);
  const featuredEvents = events.filter((event) => event.featured).slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl space-y-20 px-5 py-10 md:px-8 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <span className="chip border-velvet-400/30 bg-velvet-500/10 text-velvet-200">AI employee systems</span>
            <span className="chip">Sales automation</span>
            <span className="chip">Lead generation</span>
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-velvet-200">The Night Crew</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
              We build AI employees for businesses that automate sales, support, operations, and lead generation.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Deploy AI employees that qualify leads, support customers, streamline operations, and keep your pipeline moving 24/7.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="#book" className="btn-primary">Talk to us</Link>
            <Link href="/dashboard" className="btn-secondary">View dashboard</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              'Automated lead capture and routing',
              'Sales, support, and operations coverage',
              'Built to plug into your stack'
            ].map((item) => (
              <div key={item} className="panel-soft p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="panel overflow-hidden p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] bg-gradient-to-br from-velvet-500 to-night-500 p-5 shadow-glow">
              <p className="text-sm text-white/80">Live bookings</p>
              <p className="mt-2 text-4xl font-semibold text-white">{metrics.confirmedBookings.toLocaleString('en-IN')}</p>
              <p className="mt-2 text-sm text-white/80">Confirmed tonight</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Average occupancy</p>
              <p className="mt-2 text-4xl font-semibold text-white">{metrics.avgOccupancy}%</p>
              <p className="mt-2 text-sm text-slate-400">Across featured events</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 sm:col-span-2">
              <p className="text-sm text-slate-400">Revenue projection</p>
              <p className="mt-2 text-4xl font-semibold text-white">₹{metrics.revenueProjection.toLocaleString('en-IN')}</p>
              <p className="mt-2 text-sm text-slate-400">Based on confirmed party size and ticket value</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Capabilities</p>
          <h2 className="section-title mt-2">Built for the full business lifecycle</h2>
          <p className="section-copy mt-4">
            Every workflow is designed to be reliable, measurable, and easy to scale as your team grows.
          </p>
        </div>
        <MetricsGrid metrics={metrics} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" id="book">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Featured workflows</p>
          <h2 className="section-title">High-value automation paths</h2>
          <div className="space-y-4">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} venue={venues.find((venue) => venue.id === event.venueId)} />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Quick intro</p>
          <h2 className="section-title">Start with a short brief and we will map the right AI employees for your business.</h2>
          <BookingForm venues={venues} events={events} />
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Venues</p>
          <h2 className="section-title mt-2">Core areas we automate</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Pipeline snapshot</p>
          <h2 className="section-title">Most active opportunities</h2>
          <div className="space-y-4">
            {topBooked.slice(0, 3).map(({ event, filled }) => (
              <div key={event.id} className="panel-soft p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{event.genre}</p>
                  </div>
                  <span className="chip">{filled}/{event.capacity}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-velvet-500 to-night-400" style={{ width: `${Math.min(100, Math.round((filled / event.capacity) * 100))}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-soft p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Delivery standards</p>
          <h2 className="section-title mt-2">Execution quality checklist</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <li>• All sales, support, operations, and lead-gen actions are routed through typed workflows.</li>
            <li>• Handoffs and escalation paths are handled automatically when a workflow needs a human.</li>
            <li>• Lead lists, task queues, and workflow views are filterable and easy to manage.</li>
            <li>• Postgres or your preferred stack can be connected without redesigning the experience.</li>
            <li>• Forms include inline success and error states for reliable user feedback.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

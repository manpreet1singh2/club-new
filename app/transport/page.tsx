import { TransportScheduler } from '@/components/transport-scheduler';
import { getDashboardMetrics, listBookings, listEvents, listTransportSchedules, listVenues } from '@/lib/store';

export default async function TransportPage() {
  const [metrics, bookingPage, schedules, venues, events] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'all', page: 1, pageSize: 25 }),
    listTransportSchedules(),
    listVenues(),
    listEvents()
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Transport</p>
        <h1 className="section-title">Ride scheduling and guest movement</h1>
        <p className="section-copy">Coordinate cabs, vans, and buses for club arrivals with transport status tied to each booking.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Transport scheduled</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.transportScheduled}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Confirmed bookings</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.confirmedBookings}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Automations live</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.automationCount}</p></div>
      </div>
      <TransportScheduler bookings={bookingPage.items} schedules={schedules} />
      <div className="grid gap-4 md:grid-cols-3">
        {venues.slice(0, 3).map((venue) => (
          <article key={venue.id} className="panel-soft p-5">
            <h3 className="text-xl font-semibold text-white">{venue.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{venue.city} · {venue.neighborhood}</p>
          </article>
        ))}
      </div>
      <div className="panel-soft p-6">
        <h2 className="section-title">Transport coverage snapshots</h2>
        <p className="section-copy mt-4">The schedule is linked to live bookings and can be reconciled against event demand across upcoming sets.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">{event.title}</p>
              <p className="mt-1">Capacity {event.capacity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

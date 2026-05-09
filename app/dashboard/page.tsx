import { MetricsGrid } from '@/components/metrics-grid';
import { BookingTable } from '@/components/booking-table';
import { getDashboardMetrics, listBookings, listEvents, listVenues } from '@/lib/store';

export default async function DashboardPage() {
  const [metrics, bookingPage, venues, events] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'all', page: 1, pageSize: 8 }),
    listVenues(),
    listEvents()
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Dashboard</p>
        <h1 className="section-title">Venue operations command center</h1>
        <p className="section-copy">Monitor occupancy, confirmed reservations, waitlist pressure, and projected revenue across the live network.</p>
      </div>
      <MetricsGrid metrics={metrics} />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel-soft p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">System status</p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <li>• Venue catalog: {venues.length} active locations</li>
            <li>• Event inventory: {events.length} live events</li>
            <li>• Booking intake: API validation and automatic capacity checks</li>
            <li>• Deployment model: server-rendered pages plus route handlers</li>
            <li>• Persistence: optional Postgres via DATABASE_URL, in-memory fallback for demo mode</li>
          </ul>
          <div className="mt-6 rounded-3xl border border-white/10 bg-night-900/70 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Reputation tracking</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">Guest review triage and response workflows now live in the dashboard. Open the new reviews section to see the latest sentiment and follow-up queue.</p>
            <a href="/dashboard/reviews" className="mt-4 inline-flex items-center text-sm font-semibold text-white underline decoration-velvet-200/60 underline-offset-4 transition hover:text-velvet-100">Open reviews section</a>
          </div>
        </div>
        <BookingTable bookings={bookingPage.items} venues={venues} events={events} />
      </div>
    </div>
  );
}

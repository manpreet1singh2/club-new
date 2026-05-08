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
        <p className="section-copy">Monitor occupancy, confirmed reservations, deposit collection, transport scheduling, and projected revenue across the live network.</p>
      </div>
      <MetricsGrid metrics={metrics} />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="panel-soft p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">System status</p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <li>• Venue catalog: {venues.length} active locations</li>
            <li>• Event inventory: {events.length} live events</li>
            <li>• Booking intake: API validation, deposit checks, and capacity control</li>
            <li>• Deployment model: server-rendered pages plus route handlers</li>
            <li>• Persistence: optional Postgres via DATABASE_URL, in-memory fallback for demo mode</li>
          </ul>
        </div>
        <BookingTable bookings={bookingPage.items} venues={venues} events={events} />
      </div>
    </div>
  );
}

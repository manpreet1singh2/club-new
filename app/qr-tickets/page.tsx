import { QRTicketGrid } from '@/components/qr-ticket-grid';
import { getDashboardMetrics, listBookings, listEvents, listVenues } from '@/lib/store';

export default async function QRTicketsPage() {
  const [metrics, bookings, events, venues] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'confirmed', page: 1, pageSize: 100 }),
    listEvents(),
    listVenues()
  ]);

  const confirmedBookings = bookings.items;

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">QR Tickets</p>
        <h1 className="section-title">Scan-ready entry passes for confirmed guests</h1>
        <p className="section-copy">Generate branded ticket passes for each confirmed booking and keep the entry roster tied to live guest and venue data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Tickets issued</p><p className="mt-2 text-3xl font-semibold text-white">{confirmedBookings.length}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Venues covered</p><p className="mt-2 text-3xl font-semibold text-white">{new Set(confirmedBookings.map((booking) => booking.venueId)).size}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Events live</p><p className="mt-2 text-3xl font-semibold text-white">{events.length}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Avg occupancy</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.avgOccupancy}%</p></div>
      </div>

      <QRTicketGrid bookings={confirmedBookings} events={events} venues={venues} />
    </div>
  );
}

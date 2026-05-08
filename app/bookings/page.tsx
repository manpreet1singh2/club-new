import { BookingTable } from '@/components/booking-table';
import { getDashboardMetrics, listBookings, listEvents, listVenues } from '@/lib/store';

export default async function BookingsPage() {
  const [venues, events, bookingPage, metrics] = await Promise.all([
    listVenues(),
    listEvents(),
    listBookings({ status: 'all', page: 1, pageSize: 50 }),
    getDashboardMetrics()
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-10 md:px-8 lg:py-16">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Total bookings</p><p className="mt-2 text-3xl font-semibold text-white">{bookingPage.total}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Confirmed</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.confirmedBookings}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Waitlist</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.waitlistBookings}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Conversion</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.conversionRate}%</p></div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Bookings</p>
        <h1 className="section-title mt-2">Reservation ledger</h1>
      </div>
      <BookingTable bookings={bookingPage.items} venues={venues} events={events} />
    </div>
  );
}

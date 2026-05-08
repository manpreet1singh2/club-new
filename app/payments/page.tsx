import { PaymentCollector } from '@/components/payment-collector';
import { BookingTable } from '@/components/booking-table';
import { getDashboardMetrics, listBookings, listEvents, listVenues } from '@/lib/store';

export default async function PaymentsPage() {
  const [metrics, bookingPage, venues, events] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'all', page: 1, pageSize: 25 }),
    listVenues(),
    listEvents()
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Payments</p>
        <h1 className="section-title">Advance payment operations</h1>
        <p className="section-copy">Track the 15% table deposit, record manual collections, and reconcile bookings before entry.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Advance collected</p><p className="mt-2 text-3xl font-semibold text-white">₹{metrics.advanceCollected.toLocaleString('en-IN')}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Confirmed bookings</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.confirmedBookings}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Waitlist</p><p className="mt-2 text-3xl font-semibold text-white">{metrics.waitlistBookings}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Revenue projection</p><p className="mt-2 text-3xl font-semibold text-white">₹{metrics.revenueProjection.toLocaleString('en-IN')}</p></div>
      </div>
      <PaymentCollector bookings={bookingPage.items} />
      <BookingTable bookings={bookingPage.items} venues={venues} events={events} />
    </div>
  );
}

import { getDashboardMetrics, listBookings, listEvents, listVenues } from '@/lib/store';

export default async function BillingPage() {
  const [metrics, bookingPage, venues, events] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'all', page: 1, pageSize: 25 }),
    listVenues(),
    listEvents()
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Billing</p>
        <h1 className="section-title">Settlement operations</h1>
        <p className="section-copy">
          Track deposits, reconcile balances, and prepare a clear settlement workflow for each confirmed booking.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Advance collected</p>
          <p className="mt-2 text-3xl font-semibold text-white">₹{metrics.advanceCollected.toLocaleString('en-IN')}</p>
        </div>
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Confirmed bookings</p>
          <p className="mt-2 text-3xl font-semibold text-white">{metrics.confirmedBookings}</p>
        </div>
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Waitlist</p>
          <p className="mt-2 text-3xl font-semibold text-white">{metrics.waitlistBookings}</p>
        </div>
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Revenue projection</p>
          <p className="mt-2 text-3xl font-semibold text-white">₹{metrics.revenueProjection.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-soft p-6 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Settlement snapshot</p>
          <h2 className="text-2xl font-semibold text-white">Booking ledger overview</h2>
          <p className="section-copy">
            This section is reserved for future billing controls such as balance due, manual payment capture, and settlement status.
          </p>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            Billing settlement UI coming soon.
          </div>
        </div>

        <div className="panel-soft p-6 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Coverage</p>
          <h2 className="text-2xl font-semibold text-white">Connected data</h2>
          <ul className="space-y-3 text-sm leading-7 text-slate-300">
            <li>• Uses live metrics from the shared store.</li>
            <li>• Pulls bookings, venues, and events for settlement context.</li>
            <li>• Keeps the page structure aligned with the payments section.</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Bookings loaded</p>
          <p className="mt-2 text-3xl font-semibold text-white">{bookingPage.items.length}</p>
        </div>
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Venues available</p>
          <p className="mt-2 text-3xl font-semibold text-white">{venues.length}</p>
        </div>
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Events scheduled</p>
          <p className="mt-2 text-3xl font-semibold text-white">{events.length}</p>
        </div>
      </div>
    </div>
  );
}

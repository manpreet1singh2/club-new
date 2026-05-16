import { getBillingSummary, getDashboardMetrics, listBillingRecords, listEvents, listVenues } from '@/lib/store';

const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export default async function BillingPage() {
  const [metrics, billingRecords, billingSummary, venues, events] = await Promise.all([
    getDashboardMetrics(),
    listBillingRecords(),
    getBillingSummary(),
    listVenues(),
    listEvents()
  ]);

  const totalInvoices = billingSummary.settledInvoices + billingSummary.openInvoices;
  const settlementRate = totalInvoices ? Math.round((billingSummary.settledInvoices / totalInvoices) * 100) : 0;

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
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(metrics.advanceCollected)}</p>
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
          <p className="mt-2 text-3xl font-semibold text-white">{formatCurrency(metrics.revenueProjection)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-soft overflow-hidden">
          <div className="border-b border-white/10 px-6 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Settlement snapshot</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Booking ledger overview</h2>
            <p className="section-copy mt-3">
              Review each billing record, including the total due, amounts received, outstanding balance, and settlement status.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Guest</th>
                  <th className="px-6 py-4 font-medium">Total Due</th>
                  <th className="px-6 py-4 font-medium">Paid</th>
                  <th className="px-6 py-4 font-medium">Outstanding</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {billingRecords.length > 0 ? (
                  billingRecords.map((record) => (
                    <tr key={record.bookingId} className="text-slate-300">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{record.guestName}</div>
                        <div className="text-xs text-slate-500">
                          {record.eventTitle} · {record.venueName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{formatCurrency(record.totalDue)}</td>
                      <td className="px-6 py-4 text-white">{formatCurrency(record.paidAmount)}</td>
                      <td className="px-6 py-4 text-white">{formatCurrency(record.outstandingAmount)}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="chip capitalize">{record.status}</span>
                          <div className="text-xs text-slate-500 capitalize">Payment: {record.paymentStatus}</div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-8 text-center text-slate-400" colSpan={5}>
                      No billing records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel-soft p-6 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Billing summary</p>
          <h2 className="text-2xl font-semibold text-white">Settlement metrics</h2>
          <p className="section-copy">
            Aggregated invoice data gives a clear view of what is open, partially paid, and fully settled.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Total due</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(billingSummary.totalDue)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Paid amount</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(billingSummary.paidAmount)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Outstanding</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(billingSummary.outstandingAmount)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Average invoice</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(billingSummary.averageInvoice)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Open invoices</p>
              <p className="mt-2 text-2xl font-semibold text-white">{billingSummary.openInvoices}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Settled invoices</p>
              <p className="mt-2 text-2xl font-semibold text-white">{billingSummary.settledInvoices}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Settlement rate</p>
            <p className="mt-2 leading-7">
              {settlementRate}% of invoices are fully settled. This is based on {billingSummary.settledInvoices} settled and {billingSummary.openInvoices} open invoices.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel-soft p-5">
          <p className="text-sm text-slate-400">Billing records</p>
          <p className="mt-2 text-3xl font-semibold text-white">{billingRecords.length}</p>
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

import { PaymentCollector } from '@/components/payment-collector';
import type { BillingRecord, BillingSummary, Booking } from '@/lib/types';

function statusTone(status: BillingRecord['status']) {
  if (status === 'settled') return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200';
  if (status === 'partial') return 'border-amber-500/20 bg-amber-500/10 text-amber-200';
  return 'border-rose-500/20 bg-rose-500/10 text-rose-200';
}

export function BillingOverview({
  title,
  description,
  records,
  summary,
  bookings
}: {
  title: string;
  description: string;
  records: BillingRecord[];
  summary: BillingSummary;
  bookings: Booking[];
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Billing</p>
        <h1 className="section-title">{title}</h1>
        <p className="section-copy">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Total due</p><p className="mt-2 text-3xl font-semibold text-white">₹{summary.totalDue.toLocaleString('en-IN')}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Collected</p><p className="mt-2 text-3xl font-semibold text-white">₹{summary.paidAmount.toLocaleString('en-IN')}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Outstanding</p><p className="mt-2 text-3xl font-semibold text-white">₹{summary.outstandingAmount.toLocaleString('en-IN')}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Open invoices</p><p className="mt-2 text-3xl font-semibold text-white">{summary.openInvoices}</p></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PaymentCollector
          bookings={bookings}
          title="Record billing payment"
          description="Capture settlements against any open booking and keep the guest ledger in sync."
          actionLabel="Save payment"
          amountLabel="Settlement amount"
          amountPlaceholder="Enter amount received"
        />
        <div className="panel p-6">
          <h3 className="text-2xl font-semibold text-white">Invoice snapshots</h3>
          <p className="mt-2 text-sm text-slate-300">Service charge, transport and tax are calculated for every booking automatically.</p>
          <div className="mt-5 space-y-3">
            {records.slice(0, 6).map((record) => (
              <article key={record.bookingId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-white">{record.guestName}</h4>
                    <p className="text-sm text-slate-400">{record.venueName} · {record.eventTitle}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300 md:grid-cols-4">
                  <div><p className="text-slate-500">Base</p><p className="text-white">₹{record.baseAmount.toLocaleString('en-IN')}</p></div>
                  <div><p className="text-slate-500">Extra</p><p className="text-white">₹{(record.serviceCharge + record.transportCharge + record.taxAmount).toLocaleString('en-IN')}</p></div>
                  <div><p className="text-slate-500">Paid</p><p className="text-white">₹{record.paidAmount.toLocaleString('en-IN')}</p></div>
                  <div><p className="text-slate-500">Balance</p><p className="text-white">₹{record.outstandingAmount.toLocaleString('en-IN')}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-soft overflow-hidden p-0">
        <div className="border-b border-white/10 px-6 py-4">
          <h3 className="text-xl font-semibold text-white">Billing register</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Guest</th>
                <th className="px-6 py-4 font-medium">Venue</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Paid</th>
                <th className="px-6 py-4 font-medium">Balance</th>
                <th className="px-6 py-4 font-medium">Transport</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {records.map((record) => (
                <tr key={record.bookingId} className="text-slate-300">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{record.guestName}</div>
                    <div className="text-xs text-slate-500">{record.eventTitle}</div>
                  </td>
                  <td className="px-6 py-4">{record.venueName}</td>
                  <td className="px-6 py-4">₹{record.totalDue.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">₹{record.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">₹{record.outstandingAmount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">{record.transportType}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { BillingOverview } from '@/components/billing-overview';
import { getBillingSummary, listBillingRecords, listBookings } from '@/lib/store';

export default async function PaymentsPage() {
  const [summary, records, bookingPage] = await Promise.all([
    getBillingSummary(),
    listBillingRecords(),
    listBookings({ status: 'all', page: 1, pageSize: 25 })
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-16">
      <BillingOverview
        title="Advance payments and billing reconciliation"
        description="Collect table deposits, settle remaining balances, and monitor each invoice from one panel."
        records={records}
        summary={summary}
        bookings={bookingPage.items}
      />
    </div>
  );
}

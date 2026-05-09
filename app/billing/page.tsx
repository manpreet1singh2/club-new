import { BillingOverview } from '@/components/billing-overview';
import { getBillingSummary, listBillingRecords, listBookings } from '@/lib/store';

export default async function BillingPage() {
  const [summary, records, bookingPage] = await Promise.all([
    getBillingSummary(),
    listBillingRecords(),
    listBookings({ status: 'all', page: 1, pageSize: 25 })
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-16">
      <BillingOverview
        title="Billing desk and guest settlements"
        description="Track the advance, service charges, transport fees, tax and outstanding balance for every booking."
        records={records}
        summary={summary}
        bookings={bookingPage.items}
      />
    </div>
  );
}

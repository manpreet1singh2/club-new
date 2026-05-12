import { CRMOverview } from '@/components/crm-overview';
import { getDashboardMetrics, listAutomationEvents, listAutomations, listBookings, listEvents, listInquiries, listVenues } from '@/lib/store';

export default async function CRMPage() {
  const [metrics, bookings, inquiries, events, venues, automations, automationEvents] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'all', page: 1, pageSize: 100 }),
    listInquiries(),
    listEvents(),
    listVenues(),
    listAutomations(),
    listAutomationEvents()
  ]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-16">
      <CRMOverview
        metrics={metrics}
        bookings={bookings.items}
        inquiries={inquiries}
        events={events}
        venues={venues}
        automations={automations}
        automationEvents={automationEvents}
      />
    </div>
  );
}

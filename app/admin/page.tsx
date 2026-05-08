import { MetricsGrid } from '@/components/metrics-grid';
import { BookingTable } from '@/components/booking-table';
import { getDashboardMetrics, listAutomationEvents, listAutomations, listBookings, listEvents, listTransportSchedules, listVenues } from '@/lib/store';

export default async function AdminPage() {
  const [metrics, bookingPage, venues, events, automations, automationEvents, schedules] = await Promise.all([
    getDashboardMetrics(),
    listBookings({ status: 'all', page: 1, pageSize: 8 }),
    listVenues(),
    listEvents(),
    listAutomations(),
    listAutomationEvents(),
    listTransportSchedules()
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Admin</p>
        <h1 className="section-title">Operations control center</h1>
        <p className="section-copy">Review bookings, deposits, transport, and WhatsApp automations from one dashboard built for high-throughput nightlife operations.</p>
      </div>
      <MetricsGrid metrics={metrics} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="panel-soft p-6">
          <h2 className="section-title">WhatsApp automation rules</h2>
          <div className="mt-6 space-y-4">
            {automations.map((automation) => (
              <div key={automation.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{automation.name}</p>
                    <p className="text-sm text-slate-400">Trigger: {automation.trigger}</p>
                  </div>
                  <span className="chip">{automation.enabled ? 'enabled' : 'disabled'}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{automation.template}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-soft p-6">
          <h2 className="section-title">Automation activity</h2>
          <div className="mt-6 space-y-4">
            {automationEvents.length ? automationEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{event.label}</p>
                <p className="mt-1 text-sm text-slate-400">{event.trigger} · Booking {event.bookingId}</p>
                <p className="mt-2 text-sm text-slate-300">{event.message}</p>
              </div>
            )) : <p className="text-sm text-slate-400">No automation events yet.</p>}
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="panel-soft p-6">
          <h2 className="section-title">Transport overview</h2>
          <div className="mt-6 space-y-4">
            {schedules.length ? schedules.map((schedule) => (
              <div key={schedule.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{schedule.guestName}</p>
                <p className="mt-1 text-sm text-slate-400">{schedule.vehicleType} · {schedule.pickupTime}</p>
                <p className="mt-2 text-sm text-slate-300">{schedule.pickupLocation}</p>
              </div>
            )) : <p className="text-sm text-slate-400">No rides scheduled yet.</p>}
          </div>
        </div>
        <div className="panel-soft p-6">
          <h2 className="section-title">Booking ledger</h2>
          <p className="section-copy mt-4">The booking table now includes deposits, payment state, and transport state for each reservation.</p>
          <div className="mt-6">
            <BookingTable bookings={bookingPage.items} venues={venues} events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}

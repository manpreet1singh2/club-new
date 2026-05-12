import type { AutomationEvent, Booking, DashboardMetrics, Event, Inquiry, Venue, WhatsAppAutomation } from '@/lib/types';

function toLabel(value: string) {
  return value.replace(/_/g, ' ');
}

export function CRMOverview({
  metrics,
  bookings,
  inquiries,
  events,
  venues,
  automations,
  automationEvents
}: {
  metrics: DashboardMetrics;
  bookings: Booking[];
  inquiries: Inquiry[];
  events: Event[];
  venues: Venue[];
  automations: WhatsAppAutomation[];
  automationEvents: AutomationEvent[];
}) {
  const venueMap = new Map(venues.map((venue) => [venue.id, venue]));
  const eventMap = new Map(events.map((event) => [event.id, event]));
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending');
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed');
  const vipBookings = bookings.filter((booking) => booking.source === 'vip');
  const openBookings = bookings.filter((booking) => booking.status === 'pending' || booking.status === 'waitlist');
  const sourceBreakdown = [
    { label: 'Web', value: bookings.filter((booking) => booking.source === 'web').length },
    { label: 'Concierge', value: bookings.filter((booking) => booking.source === 'concierge').length },
    { label: 'VIP', value: vipBookings.length }
  ];
  const leadFeed = [
    ...inquiries.map((inquiry) => ({
      kind: 'Inquiry',
      name: inquiry.name,
      detail: inquiry.company || inquiry.email,
      note: inquiry.message,
      createdAt: inquiry.createdAt
    })),
    ...pendingBookings.map((booking) => ({
      kind: 'Booking',
      name: booking.guestName,
      detail: `${venueMap.get(booking.venueId)?.name ?? booking.venueId} · ${eventMap.get(booking.eventId)?.title ?? booking.eventId}`,
      note: `Party of ${booking.partySize} · arrival ${booking.arrivalTime}`,
      createdAt: booking.createdAt
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">CRM</p>
        <h1 className="section-title">Lead pipeline and guest follow-ups</h1>
        <p className="section-copy">Track new enquiries, pending bookings, high-value guests, and automation activity across the full nightlife sales cycle.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Total leads</p><p className="mt-2 text-3xl font-semibold text-white">{inquiries.length + bookings.length}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Open follow-ups</p><p className="mt-2 text-3xl font-semibold text-white">{openBookings.length + inquiries.length}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">VIP guests</p><p className="mt-2 text-3xl font-semibold text-white">{vipBookings.length}</p></div>
        <div className="panel-soft p-5"><p className="text-sm text-slate-400">Automations live</p><p className="mt-2 text-3xl font-semibold text-white">{automations.filter((automation) => automation.enabled).length}</p></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-6">
          <div className="panel p-6">
            <h2 className="text-2xl font-semibold text-white">Lead sources</h2>
            <p className="mt-2 text-sm text-slate-300">How guests are entering the funnel right now.</p>
            <div className="mt-5 space-y-4">
              {sourceBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-velvet-500 to-night-400" style={{ width: `${Math.min(100, Math.max(8, item.value * 25))}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-soft overflow-hidden p-0">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Follow-up queue</h2>
            </div>
            <div className="divide-y divide-white/10">
              {leadFeed.slice(0, 6).map((item) => (
                <article key={`${item.kind}-${item.name}-${item.createdAt}`} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-velvet-200">{item.kind}</p>
                      <h3 className="mt-1 font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-slate-400">{item.detail}</p>
                    </div>
                    <span className="chip">{new Date(item.createdAt).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel-soft p-6">
            <h2 className="text-2xl font-semibold text-white">Pipeline snapshot</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Confirmed bookings</p>
                <p className="mt-1 text-2xl font-semibold text-white">{confirmedBookings.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Pending bookings</p>
                <p className="mt-1 text-2xl font-semibold text-white">{pendingBookings.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Average occupancy</p>
                <p className="mt-1 text-2xl font-semibold text-white">{metrics.avgOccupancy}%</p>
              </div>
            </div>
          </div>

          <div className="panel-soft overflow-hidden p-0">
            <div className="border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Automation feed</h2>
            </div>
            <div className="divide-y divide-white/10">
              {automationEvents.slice(0, 5).map((event) => (
                <article key={event.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-velvet-200">{toLabel(event.trigger)}</p>
                      <h3 className="mt-1 font-semibold text-white">{event.label}</h3>
                    </div>
                    <span className="chip">{new Date(event.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{event.message}</p>
                </article>
              ))}
              {automationEvents.length === 0 ? (
                <div className="px-6 py-4 text-sm text-slate-400">No automation events yet. Confirm a booking or assign transport to start the feed.</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

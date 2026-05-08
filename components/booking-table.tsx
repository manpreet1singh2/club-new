import type { Booking, Event, Venue } from '@/lib/types';

export function BookingTable({ bookings, venues, events }: { bookings: Booking[]; venues: Venue[]; events: Event[] }) {
  const venueMap = new Map(venues.map((venue) => [venue.id, venue]));
  const eventMap = new Map(events.map((event) => [event.id, event]));

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-5 py-4 font-medium">Guest</th>
              <th className="px-5 py-4 font-medium">Venue</th>
              <th className="px-5 py-4 font-medium">Event</th>
              <th className="px-5 py-4 font-medium">Party</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-5 py-4">
                  <div className="font-medium text-white">{booking.guestName}</div>
                  <div className="text-slate-400">{booking.email}</div>
                </td>
                <td className="px-5 py-4">{venueMap.get(booking.venueId)?.name ?? booking.venueId}</td>
                <td className="px-5 py-4">{eventMap.get(booking.eventId)?.title ?? booking.eventId}</td>
                <td className="px-5 py-4">{booking.partySize} · {booking.arrivalTime}</td>
                <td className="px-5 py-4"><span className="chip">{booking.status}</span></td>
                <td className="px-5 py-4">{new Date(booking.createdAt).toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

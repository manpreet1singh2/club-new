import type { Booking, Event, Venue } from '@/lib/types';

const QR_SIZE = 21;

function hashSeed(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function inFinderPattern(row: number, col: number) {
  const topLeft = row < 7 && col < 7;
  const topRight = row < 7 && col >= QR_SIZE - 7;
  const bottomLeft = row >= QR_SIZE - 7 && col < 7;
  return topLeft || topRight || bottomLeft;
}

function finderValue(row: number, col: number) {
  const localRow = row % 7;
  const localCol = col % 7;
  const edge = localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6;
  const core = localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4;
  return edge || core;
}

function buildMatrix(seed: string) {
  return Array.from({ length: QR_SIZE }, (_, row) =>
    Array.from({ length: QR_SIZE }, (_, col) => {
      if (inFinderPattern(row, col)) {
        return finderValue(row, col);
      }

      const value = hashSeed(`${seed}:${row}:${col}`);
      return value % 3 === 0 || value % 11 === 0 || value % 17 === 0;
    })
  );
}

function QrGlyph({ seed }: { seed: string }) {
  const matrix = buildMatrix(seed);

  return (
    <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="aspect-square w-full rounded-2xl bg-white p-3 shadow-inner" shapeRendering="crispEdges" aria-hidden="true">
      {matrix.map((row, rowIndex) =>
        row.map((on, colIndex) =>
          on ? <rect key={`${rowIndex}-${colIndex}`} x={colIndex} y={rowIndex} width={1} height={1} rx={0.12} fill="#050816" /> : null
        )
      )}
    </svg>
  );
}

export function QRTicketGrid({ bookings, events, venues }: { bookings: Booking[]; events: Event[]; venues: Venue[] }) {
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed');
  const eventMap = new Map(events.map((event) => [event.id, event]));
  const venueMap = new Map(venues.map((venue) => [venue.id, venue]));
  const previewTickets = confirmedBookings.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        {previewTickets.map((booking) => {
          const event = eventMap.get(booking.eventId);
          const venue = venueMap.get(booking.venueId);
          const ticketCode = booking.id.replace(/-/g, '').slice(-10).toUpperCase();

          return (
            <article key={booking.id} className="panel p-6">
              <div className="grid gap-5 md:grid-cols-[1fr_180px] md:items-start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-velvet-200">Entry pass</p>
                      <h2 className="mt-1 text-2xl font-semibold text-white">{booking.guestName}</h2>
                      <p className="text-sm text-slate-400">{event?.title ?? booking.eventId} · {venue?.name ?? booking.venueId}</p>
                    </div>
                    <span className="chip">{booking.partySize} pax</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Arrival</p>
                      <p className="mt-1 text-lg font-semibold text-white">{booking.arrivalTime}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Ticket code</p>
                      <p className="mt-1 text-lg font-semibold text-white">{ticketCode}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Source</p>
                      <p className="mt-1 text-lg font-semibold text-white">{booking.source}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Status</p>
                      <p className="mt-1 text-lg font-semibold text-white">{booking.status}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <QrGlyph seed={`${booking.id}:${booking.eventId}`} />
                  <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-400">Scan on entry</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="panel-soft overflow-hidden p-0">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Issued ticket register</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Guest</th>
                <th className="px-6 py-4 font-medium">Venue</th>
                <th className="px-6 py-4 font-medium">Event</th>
                <th className="px-6 py-4 font-medium">Ticket code</th>
                <th className="px-6 py-4 font-medium">Party</th>
                <th className="px-6 py-4 font-medium">Arrival</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {confirmedBookings.map((booking) => {
                const event = eventMap.get(booking.eventId);
                const venue = venueMap.get(booking.venueId);
                const ticketCode = booking.id.replace(/-/g, '').slice(-10).toUpperCase();

                return (
                  <tr key={booking.id} className="text-slate-300">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{booking.guestName}</div>
                      <div className="text-xs text-slate-500">{booking.status}</div>
                    </td>
                    <td className="px-6 py-4">{venue?.name ?? booking.venueId}</td>
                    <td className="px-6 py-4">{event?.title ?? booking.eventId}</td>
                    <td className="px-6 py-4 font-mono text-white">{ticketCode}</td>
                    <td className="px-6 py-4">{booking.partySize}</td>
                    <td className="px-6 py-4">{booking.arrivalTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Event, Venue } from '@/lib/types';

export function BookingForm({ venues, events }: { venues: Venue[]; events: Event[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id ?? '');
  const filteredEvents = useMemo(() => events.filter((event) => !selectedVenueId || event.venueId === selectedVenueId), [events, selectedVenueId]);
  const [selectedEventId, setSelectedEventId] = useState(filteredEvents[0]?.id ?? events[0]?.id ?? '');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      venueId: String(formData.get('venueId') ?? ''),
      eventId: String(formData.get('eventId') ?? ''),
      guestName: String(formData.get('guestName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      partySize: Number(formData.get('partySize') ?? 1),
      arrivalTime: String(formData.get('arrivalTime') ?? ''),
      notes: String(formData.get('notes') ?? ''),
      source: 'web'
    };

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { booking?: { id: string; status: string }; error?: string };
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || 'Booking failed');
      return;
    }

    const bookingId = data.booking?.id;
    if (!bookingId) {
      setStatus('Booking succeeded, but no booking ID was returned.');
      return;
    }

    router.push(`/booking/confirmation/${bookingId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-300">Instant booking</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Reserve tables and guest-list access</h3>
        </div>
        <span className="chip">Live API</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm text-slate-300">Venue</span>
          <select name="venueId" value={selectedVenueId} onChange={(e) => { setSelectedVenueId(e.target.value); const next = events.find((item) => item.venueId === e.target.value); if (next) setSelectedEventId(next.id); }} className="field">
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Event</span>
          <select name="eventId" value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} className="field">
            {filteredEvents.length ? filteredEvents.map((event) => (
              <option key={event.id} value={event.id}>{event.title}</option>
            )) : events.map((event) => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Guest name</span>
          <input name="guestName" className="field" placeholder="Dimple Singh" />
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Email</span>
          <input name="email" type="email" className="field" placeholder="dimple@example.com" />
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Phone</span>
          <input name="phone" className="field" placeholder="+91 9XXXXXXXXX" />
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Party size</span>
          <input name="partySize" type="number" min={1} max={20} className="field" defaultValue={4} />
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Arrival time</span>
          <input name="arrivalTime" type="time" className="field" />
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Notes</span>
          <input name="notes" className="field" placeholder="Birthday, bottle service, VIP host" />
        </label>
      </div>
      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
        {loading ? 'Submitting…' : 'Confirm booking'}
      </button>
      {status ? <p className="mt-4 text-sm text-slate-300">{status}</p> : null}
    </form>
  );
}

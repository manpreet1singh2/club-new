"use client";

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Booking, TransportSchedule } from '@/lib/types';

export function TransportScheduler({ bookings, schedules }: { bookings: Booking[]; schedules: TransportSchedule[] }) {
  const transportableBookings = useMemo(() => bookings.filter((booking) => booking.transportType !== 'none' || booking.status === 'confirmed'), [bookings]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/transport', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId: String(form.get('bookingId') ?? ''),
        pickupLocation: String(form.get('pickupLocation') ?? ''),
        pickupTime: String(form.get('pickupTime') ?? ''),
        vehicleType: String(form.get('vehicleType') ?? 'cab'),
        seats: Number(form.get('seats') ?? 1),
        driverName: String(form.get('driverName') ?? ''),
        notes: String(form.get('notes') ?? '')
      })
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? `Transport scheduled for ${data.booking?.guestName ?? 'booking'}` : data.error || 'Could not schedule transport');
    if (response.ok) {
      event.currentTarget.reset();
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="panel p-6">
        <h3 className="text-2xl font-semibold text-white">Transport scheduling</h3>
        <p className="mt-2 text-sm text-slate-300">Coordinate cabs, vans, and night buses for VIP guests and group arrivals.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-slate-300">Booking</span>
            <select name="bookingId" className="field">
              <option value="">Select booking</option>
              {transportableBookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.guestName} · {booking.partySize} pax
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-2 block text-sm text-slate-300">Pickup location</span>
            <input name="pickupLocation" className="field" placeholder="Hotel, airport, home address" />
          </label>
          <label>
            <span className="mb-2 block text-sm text-slate-300">Pickup time</span>
            <input name="pickupTime" type="time" className="field" />
          </label>
          <label>
            <span className="mb-2 block text-sm text-slate-300">Vehicle type</span>
            <select name="vehicleType" className="field">
              <option value="cab">Cab</option>
              <option value="bike">Bike</option>
              <option value="van">Van</option>
              <option value="bus">Bus</option>
            </select>
          </label>
          <label>
            <span className="mb-2 block text-sm text-slate-300">Seats</span>
            <input name="seats" type="number" min={1} max={50} defaultValue={4} className="field" />
          </label>
          <label>
            <span className="mb-2 block text-sm text-slate-300">Driver</span>
            <input name="driverName" className="field" placeholder="Optional driver name" />
          </label>
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm text-slate-300">Notes</span>
            <input name="notes" className="field" placeholder="Pickup instructions, gate details, luggage notes" />
          </label>
        </div>
        <button disabled={loading} className="btn-primary mt-5">{loading ? 'Scheduling…' : 'Schedule transport'}</button>
        {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {schedules.map((schedule) => (
          <article key={schedule.id} className="panel-soft p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{schedule.guestName}</h4>
                <p className="text-sm text-slate-400">Pickup {schedule.pickupTime}</p>
              </div>
              <span className="chip">{schedule.vehicleType}</span>
            </div>
            <p className="mt-4 text-sm text-slate-300">{schedule.pickupLocation}</p>
            <p className="mt-2 text-sm text-slate-400">{schedule.status} · {schedule.seats} seats</p>
            <div className="mt-4 flex items-center gap-3">
              <select
                className="field min-w-0 flex-1"
                defaultValue={schedule.status}
                onChange={(event) => {
                  const status = event.target.value as 'scheduled' | 'assigned' | 'completed' | 'cancelled';
                  setUpdatingId(schedule.id);
                  fetch('/api/transport', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ scheduleId: schedule.id, status })
                  })
                    .then(async (response) => {
                      const data = await response.json();
                      setMessage(response.ok ? `Transport status updated for ${data.booking?.guestName ?? schedule.guestName}` : data.error || 'Could not update transport');
                      if (response.ok) router.refresh();
                    })
                    .finally(() => setUpdatingId(''));
                }}
                disabled={updatingId === schedule.id}
              >
                <option value="scheduled">Scheduled</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

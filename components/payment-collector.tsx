"use client";

import { useMemo, useState, type FormEvent } from 'react';
import type { Booking } from '@/lib/types';

export function PaymentCollector({ bookings, title = 'Advance payment collection', description = 'Collect the required 15% table deposit and lock bookings automatically.', actionLabel = 'Record payment', amountLabel = 'Amount', amountPlaceholder = 'Enter advance amount' }: { bookings: Booking[]; title?: string; description?: string; actionLabel?: string; amountLabel?: string; amountPlaceholder?: string }) {
  const payableBookings = useMemo(() => bookings.filter((booking) => (booking.advanceAmount ?? 0) > 0), [bookings]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId: String(form.get('bookingId') ?? ''),
        amount: Number(form.get('amount') ?? 0),
        method: String(form.get('method') ?? 'upi')
      })
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? `Payment recorded for ${data.booking?.guestName ?? 'booking'}` : data.error || 'Could not record payment');
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="panel p-6">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm text-slate-300">Booking</span>
          <select name="bookingId" className="field">
            <option value="">Select booking</option>
            {payableBookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.guestName} · ₹{booking.advanceAmount?.toLocaleString('en-IN')}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">{amountLabel}</span>
          <input name="amount" type="number" min={1} className="field" placeholder={amountPlaceholder} />
        </label>
        <label>
          <span className="mb-2 block text-sm text-slate-300">Method</span>
          <select name="method" className="field">
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="cash">Cash</option>
          </select>
        </label>
      </div>
      <button disabled={loading} className="btn-primary mt-5">{loading ? 'Recording…' : actionLabel}</button>
      {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}
    </form>
  );
}

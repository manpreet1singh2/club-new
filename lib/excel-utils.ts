import type { Booking } from './types';

function csvEscape(value: string | number | boolean | null | undefined): string {
  const text = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

/**
 * Converts an array of booking objects into a CSV string
 */
export function convertToCSV(bookings: Booking[]): string {
  if (bookings.length === 0) return '';

  const headers = [
    'Booking ID',
    'Venue ID',
    'Event ID',
    'Guest Name',
    'Email',
    'Phone',
    'Num People',
    'Arrival Time',
    'Notes',
    'Status',
    'Source',
    'Advance Amount',
    'Paid Amount',
    'Payment Status',
    'Transport Type',
    'Pickup Location',
    'Transport Status',
    'WhatsApp Opt-In',
    'Created At'
  ];

  const rows = bookings.map((booking) => [
    booking.id,
    booking.venueId,
    booking.eventId,
    booking.guestName,
    booking.email,
    booking.phone,
    booking.partySize,
    booking.arrivalTime,
    booking.notes || 'N/A',
    booking.status,
    booking.source,
    booking.advanceAmount ?? 0,
    booking.paidAmount ?? 0,
    booking.paymentStatus ?? 'pending',
    booking.transportType ?? 'none',
    booking.pickupLocation || 'N/A',
    booking.transportStatus ?? 'unscheduled',
    booking.whatsappOptIn ?? true,
    booking.createdAt
  ]);

  return [headers.map(csvEscape).join(','), ...rows.map((row) => row.map(csvEscape).join(','))].join('\n');
}

/**
 * Triggers a file download of a CSV string in the browser
 */
export function downloadCSV(csvContent: string, filename: string): void {
  if (typeof window === 'undefined') return;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

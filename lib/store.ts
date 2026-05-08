import { randomUUID } from 'crypto';
import { bookings as seedBookings, events as seedEvents, inquiries as seedInquiries, venues as seedVenues } from './mock-data';
import type { Booking, BookingStatus, DashboardMetrics, Event, Inquiry, Venue } from './types';
import { pool } from './db';

const globalForClub = globalThis as unknown as {
  clubStore?: {
    venues: Venue[];
    events: Event[];
    bookings: Booking[];
    inquiries: Inquiry[];
  };
};

const memory = globalForClub.clubStore ?? {
  venues: [...seedVenues],
  events: [...seedEvents],
  bookings: [...seedBookings],
  inquiries: [...seedInquiries]
};

globalForClub.clubStore = memory;

function normalize(text: string) {
  return text.trim().toLowerCase();
}

export async function listVenues(filters?: { city?: string; priceTier?: string; capacity?: number }): Promise<Venue[]> {
  if (!pool) {
    return memory.venues.filter((venue) => {
      if (filters?.city && filters.city !== 'all' && normalize(venue.city) !== normalize(filters.city)) return false;
      if (filters?.priceTier && filters.priceTier !== 'all' && normalize(venue.priceTier) !== normalize(filters.priceTier)) return false;
      if (filters?.capacity && venue.capacity < filters.capacity) return false;
      return true;
    });
  }

  const params: Array<string | number> = [];
  const clauses: string[] = [];
  if (filters?.city && filters.city !== 'all') {
    params.push(filters.city);
    clauses.push(`LOWER(city) = LOWER($${params.length})`);
  }
  if (filters?.priceTier && filters.priceTier !== 'all') {
    params.push(filters.priceTier);
    clauses.push(`LOWER(price_tier) = LOWER($${params.length})`);
  }
  if (filters?.capacity) {
    params.push(filters.capacity);
    clauses.push(`capacity >= $${params.length}`);
  }
  const sql = `SELECT * FROM venues${clauses.length ? ` WHERE ${clauses.join(' AND ')}` : ''} ORDER BY rating DESC, capacity DESC`;
  const result = await pool.query(sql, params);
  return result.rows as Venue[];
}

export async function listEvents(filters?: { venueId?: string }): Promise<Event[]> {
  if (!pool) {
    return filters?.venueId && filters.venueId !== 'all' ? memory.events.filter((event) => event.venueId === filters.venueId) : [...memory.events];
  }

  const result = filters?.venueId && filters.venueId !== 'all'
    ? await pool.query('SELECT * FROM events WHERE venue_id = $1 ORDER BY start_at ASC', [filters.venueId])
    : await pool.query('SELECT * FROM events ORDER BY start_at ASC');
  return result.rows as Event[];
}

export async function getVenueById(id: string) {
  const venues = await listVenues();
  return venues.find((venue) => venue.id === id) ?? null;
}

export async function getEventById(id: string) {
  const events = await listEvents();
  return events.find((event) => event.id === id) ?? null;
}

export async function listBookings(filters?: { venueId?: string; eventId?: string; status?: BookingStatus | 'all'; page?: number; pageSize?: number }) {
  const page = Math.max(1, filters?.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters?.pageSize ?? 10));

  if (!pool) {
    const filtered = memory.bookings.filter((booking) => {
      if (filters?.venueId && filters.venueId !== 'all' && booking.venueId !== filters.venueId) return false;
      if (filters?.eventId && filters.eventId !== 'all' && booking.eventId !== filters.eventId) return false;
      if (filters?.status && filters.status !== 'all' && booking.status !== filters.status) return false;
      return true;
    });

    const start = (page - 1) * pageSize;
    return {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize
    };
  }

  const where: string[] = [];
  const params: Array<string | number> = [];
  if (filters?.venueId && filters.venueId !== 'all') {
    params.push(filters.venueId);
    where.push(`venue_id = $${params.length}`);
  }
  if (filters?.eventId && filters.eventId !== 'all') {
    params.push(filters.eventId);
    where.push(`event_id = $${params.length}`);
  }
  if (filters?.status && filters.status !== 'all') {
    params.push(filters.status);
    where.push(`status = $${params.length}`);
  }
  params.push(pageSize, (page - 1) * pageSize);
  const query = `SELECT *, COUNT(*) OVER() AS total_count FROM bookings${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
  const result = await pool.query(query, params);
  const total = result.rows[0] ? Number(result.rows[0].total_count) : 0;
  const items = result.rows.map((row) => {
    const { total_count, ...rest } = row;
    return rest as Booking;
  });
  return { items, total, page, pageSize };
}

export async function createBooking(input: Omit<Booking, 'id' | 'status' | 'createdAt'> & { source?: Booking['source'] }) {
  const event = (await listEvents()).find((item) => item.id === input.eventId);
  const venue = (await listVenues()).find((item) => item.id === input.venueId);
  if (!event || !venue) {
    throw new Error('Venue or event not found');
  }

  const matchingBookings = (await listBookings({ eventId: input.eventId, status: 'all', page: 1, pageSize: 1000 })).items;
  const occupied = matchingBookings.filter((booking) => booking.status === 'confirmed').reduce((sum, booking) => sum + booking.partySize, 0);
  const nextStatus: BookingStatus = occupied + input.partySize > event.capacity ? 'waitlist' : 'confirmed';

  const booking: Booking = {
    id: randomUUID(),
    venueId: input.venueId,
    eventId: input.eventId,
    guestName: input.guestName,
    email: input.email,
    phone: input.phone,
    partySize: input.partySize,
    arrivalTime: input.arrivalTime,
    notes: input.notes,
    source: input.source ?? 'web',
    status: nextStatus,
    createdAt: new Date().toISOString()
  };

  if (!pool) {
    memory.bookings.unshift(booking);
    return { booking, venue, event };
  }

  await pool.query(
    'INSERT INTO bookings (id, venue_id, event_id, guest_name, email, phone, party_size, arrival_time, notes, source, status, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
    [booking.id, booking.venueId, booking.eventId, booking.guestName, booking.email, booking.phone, booking.partySize, booking.arrivalTime, booking.notes, booking.source, booking.status, booking.createdAt]
  );

  return { booking, venue, event };
}

export async function createInquiry(input: Omit<Inquiry, 'id' | 'createdAt'>) {
  const inquiry: Inquiry = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
  if (!pool) {
    memory.inquiries.unshift(inquiry);
    return inquiry;
  }

  await pool.query('INSERT INTO inquiries (id, name, email, company, message, created_at) VALUES ($1,$2,$3,$4,$5,$6)', [
    inquiry.id,
    inquiry.name,
    inquiry.email,
    inquiry.company,
    inquiry.message,
    inquiry.createdAt
  ]);

  return inquiry;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const venues = await listVenues();
  const events = await listEvents();
  const bookingPage = await listBookings({ status: 'all', page: 1, pageSize: 1000 });
  const confirmed = bookingPage.items.filter((booking) => booking.status === 'confirmed');
  const waitlist = bookingPage.items.filter((booking) => booking.status === 'waitlist');
  const occupancy = events.length
    ? Math.round(
        events.reduce((sum, event) => {
          const total = bookingPage.items.filter((booking) => booking.eventId === event.id && booking.status === 'confirmed').reduce((inner, booking) => inner + booking.partySize, 0);
          return sum + Math.min(100, Math.round((total / event.capacity) * 100));
        }, 0) / events.length
      )
    : 0;

  const conversionRate = bookingPage.total ? Math.round((confirmed.length / bookingPage.total) * 100) : 0;
  const revenueProjection = confirmed.reduce((sum, booking) => {
    const event = events.find((item) => item.id === booking.eventId);
    return sum + (event?.ticketPrice ?? 0) * booking.partySize;
  }, 0);

  return {
    totalVenues: venues.length,
    activeEvents: events.length,
    confirmedBookings: confirmed.length,
    waitlistBookings: waitlist.length,
    avgOccupancy: occupancy,
    conversionRate,
    revenueProjection
  };
}

export async function getTopBookedEvents() {
  const events = await listEvents();
  const bookingPage = await listBookings({ status: 'all', page: 1, pageSize: 1000 });
  return events
    .map((event) => ({
      event,
      bookings: bookingPage.items.filter((booking) => booking.eventId === event.id),
      filled: bookingPage.items.filter((booking) => booking.eventId === event.id && booking.status === 'confirmed').reduce((sum, booking) => sum + booking.partySize, 0)
    }))
    .sort((a, b) => b.filled - a.filled);
}
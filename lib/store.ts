import { randomUUID } from 'crypto';
import { bookings as seedBookings, events as seedEvents, inquiries as seedInquiries, venues as seedVenues } from './mock-data';
import type { AutomationEvent, Booking, BookingStatus, DashboardMetrics, Event, Inquiry, PaymentStatus, TransportSchedule, TransportStatus, TransportType, Venue, WhatsAppAutomation, WhatsAppTriggerType } from './types';
import { pool } from './db';

const globalForClub = globalThis as unknown as {
  clubStore?: {
    venues: Venue[];
    events: Event[];
    bookings: Booking[];
    inquiries: Inquiry[];
    schedules: TransportSchedule[];
    automations: WhatsAppAutomation[];
    automationEvents: AutomationEvent[];
  };
};

function percent15(value: number) {
  return Math.ceil(value * 0.15);
}

const memory = globalForClub.clubStore ?? {
  venues: [...seedVenues],
  events: [...seedEvents],
  bookings: [...seedBookings].map((booking) => {
    const event = seedEvents.find((item) => item.id === booking.eventId);
    const advanceAmount = event ? percent15(event.ticketPrice * booking.partySize) : 0;
    return { ...booking, advanceAmount, paidAmount: booking.status === 'confirmed' ? advanceAmount : 0, paymentStatus: booking.status === 'confirmed' ? 'paid' : 'pending' };
  }),
  inquiries: [...seedInquiries],
  schedules: [] as TransportSchedule[],
  automations: [
    {
      id: 'wa-1',
      trigger: 'booking_confirmed',
      name: 'Booking confirmation',
      enabled: true,
      template: 'Your table booking is confirmed. Advance amount is payable before entry.',
      deliveryChannel: 'whatsapp'
    },
    {
      id: 'wa-2',
      trigger: 'advance_paid',
      name: 'Advance payment receipt',
      enabled: true,
      template: 'Advance payment received. Your booking is now locked in.',
      deliveryChannel: 'whatsapp'
    },
    {
      id: 'wa-3',
      trigger: 'transport_assigned',
      name: 'Transport assignment',
      enabled: true,
      template: 'Your ride has been scheduled. Driver details will be shared automatically.',
      deliveryChannel: 'whatsapp'
    }
  ],
  automationEvents: [] as AutomationEvent[]
};

globalForClub.clubStore = memory;

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function pushAutomation(trigger: WhatsAppTriggerType, bookingId: string, label: string, message: string) {
  const event: AutomationEvent = {
    id: randomUUID(),
    trigger,
    bookingId,
    label,
    message,
    createdAt: new Date().toISOString()
  };
  memory.automationEvents.unshift(event);
  return event;
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

export async function listBookings(filters?: { venueId?: string; eventId?: string; status?: BookingStatus | 'all'; page?: number; pageSize?: number }): Promise<{ items: Booking[]; total: number; page: number; pageSize: number }> {
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
    return { items: filtered.slice(start, start + pageSize), total: filtered.length, page, pageSize };
  }

  const where: string[] = [];
  const params: Array<string | number> = [];
  if (filters?.venueId && filters.venueId !== 'all') { params.push(filters.venueId); where.push(`venue_id = $${params.length}`); }
  if (filters?.eventId && filters.eventId !== 'all') { params.push(filters.eventId); where.push(`event_id = $${params.length}`); }
  if (filters?.status && filters.status !== 'all') { params.push(filters.status); where.push(`status = $${params.length}`); }
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

export async function getBookingById(id: string) {
  const bookings = await listBookings({ status: 'all', page: 1, pageSize: 1000 });
  return bookings.items.find((booking) => booking.id === id) ?? null;
}

export async function createBooking(input: Omit<Booking, 'id' | 'status' | 'createdAt' | 'advanceAmount' | 'paidAmount' | 'paymentStatus' | 'transportStatus'> & { source?: Booking['source'] }) {
  const event = (await listEvents()).find((item) => item.id === input.eventId);
  const venue = (await listVenues()).find((item) => item.id === input.venueId);
  if (!event || !venue) throw new Error('Venue or event not found');

  const matchingBookings = (await listBookings({ eventId: input.eventId, status: 'all', page: 1, pageSize: 1000 })).items;
  const occupied = matchingBookings.filter((booking) => booking.status === 'confirmed').reduce((sum, booking) => sum + booking.partySize, 0);
  const nextStatus: BookingStatus = occupied + input.partySize > event.capacity ? 'waitlist' : 'confirmed';
  const advanceAmount = percent15(event.ticketPrice * input.partySize);

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
    createdAt: new Date().toISOString(),
    advanceAmount,
    paidAmount: nextStatus === 'confirmed' ? advanceAmount : 0,
    paymentStatus: nextStatus === 'confirmed' ? 'paid' : 'pending',
    transportType: input.transportType ?? 'none',
    pickupLocation: input.pickupLocation ?? '',
    transportStatus: input.transportType && input.transportType !== 'none' ? 'unscheduled' : 'cancelled',
    whatsappOptIn: input.whatsappOptIn ?? true
  };

  if (!pool) {
    memory.bookings.unshift(booking);
    if (booking.status === 'confirmed' && booking.whatsappOptIn) pushAutomation('booking_confirmed', booking.id, 'booking_confirmed', `Confirmed table booking for ${booking.guestName}`);
    return { booking, venue, event, advanceAmount };
  }

  await pool.query(
    'INSERT INTO bookings (id, venue_id, event_id, guest_name, email, phone, party_size, arrival_time, notes, source, status, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
    [booking.id, booking.venueId, booking.eventId, booking.guestName, booking.email, booking.phone, booking.partySize, booking.arrivalTime, booking.notes, booking.source, booking.status, booking.createdAt]
  );

  return { booking, venue, event, advanceAmount };
}

export async function registerAdvancePayment(input: { bookingId: string; amount: number; method: 'upi' | 'card' | 'cash' }) {
  const booking = await getBookingById(input.bookingId);
  if (!booking) throw new Error('Booking not found');
  booking.paidAmount = (booking.paidAmount ?? 0) + input.amount;
  booking.paymentStatus = booking.advanceAmount && booking.paidAmount >= booking.advanceAmount ? 'paid' : 'pending';
  if (booking.paymentStatus === 'paid' && booking.whatsappOptIn) pushAutomation('advance_paid', booking.id, 'advance_paid', `Advance payment received for ${booking.guestName}`);
  return { booking, method: input.method };
}

export async function scheduleTransport(input: { bookingId: string; pickupLocation: string; pickupTime: string; vehicleType: Exclude<TransportType, 'none'>; seats: number; driverName?: string; notes?: string }) {
  const booking = await getBookingById(input.bookingId);
  if (!booking) throw new Error('Booking not found');
  booking.transportType = input.vehicleType;
  booking.pickupLocation = input.pickupLocation;
  booking.transportStatus = 'scheduled';

  const schedule: TransportSchedule = {
    id: randomUUID(),
    bookingId: booking.id,
    guestName: booking.guestName,
    pickupLocation: input.pickupLocation,
    destination: booking.venueId,
    vehicleType: input.vehicleType,
    seats: input.seats,
    pickupTime: input.pickupTime,
    status: 'scheduled',
    driverName: input.driverName,
    notes: input.notes,
    createdAt: new Date().toISOString()
  };
  memory.schedules.unshift(schedule);
  if (booking.whatsappOptIn) pushAutomation('transport_assigned', booking.id, 'transport_assigned', `Transport assigned for ${booking.guestName}`);
  return { schedule, booking };
}

export async function createInquiry(input: Omit<Inquiry, 'id' | 'createdAt'>) {
  const inquiry: Inquiry = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
  if (!pool) {
    memory.inquiries.unshift(inquiry);
    return inquiry;
  }

  await pool.query('INSERT INTO inquiries (id, name, email, company, message, created_at) VALUES ($1,$2,$3,$4,$5,$6)', [
    inquiry.id, inquiry.name, inquiry.email, inquiry.company, inquiry.message, inquiry.createdAt
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
    ? Math.round(events.reduce((sum, event) => {
        const total = bookingPage.items.filter((booking) => booking.eventId === event.id && booking.status === 'confirmed').reduce((inner, booking) => inner + booking.partySize, 0);
        return sum + Math.min(100, Math.round((total / event.capacity) * 100));
      }, 0) / events.length)
    : 0;
  const conversionRate = bookingPage.total ? Math.round((confirmed.length / bookingPage.total) * 100) : 0;
  const revenueProjection = confirmed.reduce((sum, booking) => {
    const event = events.find((item) => item.id === booking.eventId);
    return sum + (event?.ticketPrice ?? 0) * booking.partySize;
  }, 0);
  const advanceCollected = bookingPage.items.reduce((sum, booking) => sum + (booking.paidAmount ?? 0), 0);

  return {
    totalVenues: venues.length,
    activeEvents: events.length,
    confirmedBookings: confirmed.length,
    waitlistBookings: waitlist.length,
    avgOccupancy: occupancy,
    conversionRate,
    revenueProjection,
    advanceCollected,
    transportScheduled: memory.schedules.filter((schedule) => schedule.status === 'scheduled' || schedule.status === 'assigned').length,
    automationCount: memory.automations.filter((automation) => automation.enabled).length
  };
}

export async function getTopBookedEvents(): Promise<Array<{ event: Event; bookings: Booking[]; filled: number }>> {
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

export async function listTransportSchedules(): Promise<TransportSchedule[]> {
  return memory.schedules;
}

export async function listAutomations(): Promise<WhatsAppAutomation[]> {
  return memory.automations;
}

export async function listAutomationEvents(): Promise<AutomationEvent[]> {
  return memory.automationEvents;
}

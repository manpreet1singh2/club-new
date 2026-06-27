import { z } from 'zod';

export const bookingSchema = z.object({
  venueId: z.string().min(1),
  eventId: z.string().min(1),
  guestName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  partySize: z.number().int().positive().max(20),
  arrivalTime: z.string().min(2),
  notes: z.string().optional().default(''),
  source: z.enum(['web', 'concierge', 'vip']).optional().default('web'),
  transportType: z.enum(['none', 'cab', 'bike', 'van', 'bus']).optional().default('none'),
  pickupLocation: z.string().optional().default(''),
  whatsappOptIn: z.boolean().optional().default(true)
});

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().default(''),
  message: z.string().min(10)
});

export const venueFiltersSchema = z.object({
  city: z.string().optional().default('all'),
  priceTier: z.string().optional().default('all'),
  capacity: z.coerce.number().optional().default(0)
});

export const eventFiltersSchema = z.object({
  venueId: z.string().optional().default('all')
});

export const paymentSchema = z.object({
  bookingId: z.string().min(1),
  amount: z.coerce.number().positive(),
  method: z.enum(['upi', 'card', 'cash']).default('upi')
});

export const transportSchema = z.object({
  bookingId: z.string().min(1),
  pickupLocation: z.string().min(3),
  pickupTime: z.string().min(2),
  vehicleType: z.enum(['cab', 'bike', 'van', 'bus']),
  seats: z.coerce.number().int().positive().max(50),
  driverName: z.string().optional().default(''),
  notes: z.string().optional().default('')
});


export const transportStatusSchema = z.object({
  scheduleId: z.string().min(1),
  status: z.enum(['scheduled', 'assigned', 'completed', 'cancelled'])
});

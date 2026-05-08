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
  source: z.enum(['web', 'concierge', 'vip']).optional().default('web')
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
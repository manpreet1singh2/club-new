export type Venue = {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  capacity: number;
  priceTier: 'VIP' | 'Premium' | 'Standard';
  vibe: string;
  coverCharge: number;
  rating: number;
  features: string[];
  openingHours: string;
  music: string[];
  image: string;
};

export type Event = {
  id: string;
  venueId: string;
  title: string;
  genre: string;
  startAt: string;
  endAt: string;
  ticketPrice: number;
  capacity: number;
  ageLimit: number;
  dressCode: string;
  description: string;
  featured: boolean;
};

export type BookingStatus = 'pending' | 'confirmed' | 'waitlist' | 'cancelled';

export type Booking = {
  id: string;
  venueId: string;
  eventId: string;
  guestName: string;
  email: string;
  phone: string;
  partySize: number;
  arrivalTime: string;
  notes: string;
  status: BookingStatus;
  source: 'web' | 'concierge' | 'vip';
  createdAt: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
};

export type DashboardMetrics = {
  totalVenues: number;
  activeEvents: number;
  confirmedBookings: number;
  waitlistBookings: number;
  avgOccupancy: number;
  conversionRate: number;
  revenueProjection: number;
};
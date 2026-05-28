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
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type BillingStatus = 'open' | 'partial' | 'settled';
export type TransportType = 'none' | 'cab' | 'bike' | 'van' | 'bus';
export type TransportStatus = 'unscheduled' | 'scheduled' | 'assigned' | 'completed' | 'cancelled';
export type WhatsAppTriggerType = 'booking_confirmed' | 'advance_paid' | 'transport_assigned';

export type Booking = {
  id: string;
  bookingId: string;
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
  advanceAmount?: number;
  paidAmount?: number;
  paymentStatus?: PaymentStatus;
  transportType?: TransportType;
  pickupLocation?: string;
  transportStatus?: TransportStatus;
  whatsappOptIn?: boolean;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
};

export type TransportSchedule = {
  id: string;
  bookingId: string;
  guestName: string;
  pickupLocation: string;
  destination: string;
  vehicleType: Exclude<TransportType, 'none'>;
  seats: number;
  pickupTime: string;
  status: TransportStatus;
  driverName?: string;
  notes?: string;
  createdAt: string;
};

export type BillingRecord = {
  bookingId: string;
  guestName: string;
  venueName: string;
  eventTitle: string;
  baseAmount: number;
  serviceCharge: number;
  transportCharge: number;
  taxAmount: number;
  totalDue: number;
  paidAmount: number;
  outstandingAmount: number;
  paymentStatus: PaymentStatus;
  status: BillingStatus;
  transportType: TransportType;
  createdAt: string;
};

export type BillingSummary = {
  totalDue: number;
  paidAmount: number;
  outstandingAmount: number;
  openInvoices: number;
  settledInvoices: number;
  averageInvoice: number;
};

export type AutomationEvent = {
  id: string;
  trigger: WhatsAppTriggerType;
  bookingId: string;
  label: string;
  message: string;
  createdAt: string;
};

export type WhatsAppAutomation = {
  id: string;
  trigger: WhatsAppTriggerType;
  name: string;
  enabled: boolean;
  template: string;
  deliveryChannel: 'whatsapp';
  lastFiredAt?: string;
};

export type LegacyClub = {
  id: string;
  name: string;
  location: string;
};

export type LegacyPackage = {
  id: string;
  clubId: string;
  name: string;
  description: string;
  price: number;
  includesDrinks: boolean;
  includesTransport: boolean;
};

export type DashboardMetrics = {
  totalVenues: number;
  activeEvents: number;
  confirmedBookings: number;
  waitlistBookings: number;
  avgOccupancy: number;
  conversionRate: number;
  revenueProjection: number;
  advanceCollected: number;
  transportScheduled: number;
  automationCount: number;
};

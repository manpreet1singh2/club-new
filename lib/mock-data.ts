import type { Booking, Event, Inquiry, LegacyClub, LegacyPackage, Venue } from './types';

export const venues: Venue[] = [
  {
    id: 'venue-orbit',
    name: 'Orbit Lounge',
    city: 'Mumbai',
    neighborhood: 'Bandra',
    capacity: 620,
    priceTier: 'VIP',
    vibe: 'Industrial, LED-heavy, high-energy rooftop after-dark venue',
    coverCharge: 2500,
    rating: 4.9,
    features: ['Table service', 'Rooftop deck', 'Private booths', 'Valet access'],
    openingHours: 'Thu–Sun, 7 PM – 3 AM',
    music: ['House', 'Techno', 'Commercial'],
    image: 'Orbit'
  },
  {
    id: 'venue-luxe',
    name: 'Luxe District',
    city: 'Delhi',
    neighborhood: 'Aerocity',
    capacity: 480,
    priceTier: 'Premium',
    vibe: 'Upscale lounge with international DJs and bottle service',
    coverCharge: 1800,
    rating: 4.8,
    features: ['VIP host', 'Guest list', 'Signature cocktails', 'Late kitchen'],
    openingHours: 'Wed–Sun, 8 PM – 2:30 AM',
    music: ['Afro House', 'Hip-hop', 'Pop'],
    image: 'Luxe'
  },
  {
    id: 'venue-neon',
    name: 'Neon Vault',
    city: 'Bengaluru',
    neighborhood: 'Indiranagar',
    capacity: 350,
    priceTier: 'Standard',
    vibe: 'Compact club built for fast-moving crowd flow and strong acoustics',
    coverCharge: 900,
    rating: 4.7,
    features: ['Fast entry', 'QR check-in', 'Terrace smoking zone', 'Weekend brunches'],
    openingHours: 'Fri–Sun, 6 PM – 1:30 AM',
    music: ['EDM', 'Trap', 'Bollywood remixes'],
    image: 'Neon'
  },
  {
    id: 'venue-arcade',
    name: 'Arcade 88',
    city: 'Goa',
    neighborhood: 'Baga',
    capacity: 540,
    priceTier: 'Premium',
    vibe: 'Tourist-friendly beach club with late-night performances',
    coverCharge: 2200,
    rating: 4.8,
    features: ['Beach access', 'Live acts', 'Bottle packages', 'Event buyouts'],
    openingHours: 'Daily, 6 PM – 4 AM',
    music: ['Deep House', 'Afrobeats', 'Latin'],
    image: '88'
  },
  {
    id: 'venue-midnight',
    name: 'Midnight Society',
    city: 'Hyderabad',
    neighborhood: 'Jubilee Hills',
    capacity: 430,
    priceTier: 'Premium',
    vibe: 'Design-forward club with intelligent lighting and curated crowd control',
    coverCharge: 1500,
    rating: 4.6,
    features: ['Table booking', 'Host dashboard', 'Member tiers', 'Quick confirmation'],
    openingHours: 'Thu–Sun, 7 PM – 2 AM',
    music: ['House', 'R&B', 'Commercial'],
    image: 'MS'
  }
];

export const events: Event[] = [
  {
    id: 'event-noir-friday',
    venueId: 'venue-orbit',
    title: 'Noir Friday',
    genre: 'House & Techno',
    startAt: '2026-05-08T21:30:00+05:30',
    endAt: '2026-05-09T03:00:00+05:30',
    ticketPrice: 1800,
    capacity: 400,
    ageLimit: 21,
    dressCode: 'Smart casual',
    description: 'Peak Friday program with headline DJ, reserve tables, and priority entry.',
    featured: true
  },
  {
    id: 'event-sunrise-set',
    venueId: 'venue-arcade',
    title: 'Sunrise Set',
    genre: 'Deep House',
    startAt: '2026-05-09T22:00:00+05:30',
    endAt: '2026-05-10T04:00:00+05:30',
    ticketPrice: 2200,
    capacity: 500,
    ageLimit: 21,
    dressCode: 'Beach chic',
    description: 'Late-night beach session with cocktails, performers, and VIP lounges.',
    featured: true
  },
  {
    id: 'event-luxe-ladies-night',
    venueId: 'venue-luxe',
    title: 'Luxe Ladies Night',
    genre: 'Commercial & Hip-hop',
    startAt: '2026-05-10T20:30:00+05:30',
    endAt: '2026-05-11T02:30:00+05:30',
    ticketPrice: 1400,
    capacity: 320,
    ageLimit: 21,
    dressCode: 'Elegant evening wear',
    description: 'Hosted guest list, bottle specials, and premium table experiences.',
    featured: false
  },
  {
    id: 'event-neon-basement',
    venueId: 'venue-neon',
    title: 'Basement Frequency',
    genre: 'EDM & Trap',
    startAt: '2026-05-11T19:00:00+05:30',
    endAt: '2026-05-12T01:30:00+05:30',
    ticketPrice: 800,
    capacity: 260,
    ageLimit: 18,
    dressCode: 'Streetwear',
    description: 'Fast sellout event for young crowd with reduced line wait and entry tiers.',
    featured: false
  }
];

export const bookings: Booking[] = [
  {
    id: 'bk-1001',
    venueId: 'venue-orbit',
    eventId: 'event-noir-friday',
    guestName: 'Aarav Mehta',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    partySize: 6,
    arrivalTime: '22:15',
    notes: 'Birthday celebration. Need booth near the DJ.',
    status: 'confirmed',
    source: 'vip',
    createdAt: '2026-05-07T19:10:00+05:30'
  },
  {
    id: 'bk-1002',
    venueId: 'venue-orbit',
    eventId: 'event-noir-friday',
    guestName: 'Tanya Kapoor',
    email: 'tanya@example.com',
    phone: '+91 98765 43211',
    partySize: 4,
    arrivalTime: '23:00',
    notes: 'Guest list only.',
    status: 'pending',
    source: 'web',
    createdAt: '2026-05-08T15:40:00+05:30'
  },
  {
    id: 'bk-1003',
    venueId: 'venue-luxe',
    eventId: 'event-luxe-ladies-night',
    guestName: 'Rohit Saini',
    email: 'rohit@example.com',
    phone: '+91 98765 43212',
    partySize: 8,
    arrivalTime: '21:30',
    notes: 'Anniversary dinner then club entry.',
    status: 'confirmed',
    source: 'concierge',
    createdAt: '2026-05-08T13:15:00+05:30'
  },
  {
    id: 'bk-1004',
    venueId: 'venue-arcade',
    eventId: 'event-sunrise-set',
    guestName: 'Priya Dutta',
    email: 'priya@example.com',
    phone: '+91 98765 43213',
    partySize: 2,
    arrivalTime: '23:45',
    notes: 'Need sea-facing table if available.',
    status: 'waitlist',
    source: 'web',
    createdAt: '2026-05-08T16:05:00+05:30'
  }
];

export const inquiries: Inquiry[] = [
  {
    id: 'inq-2001',
    name: 'Venue Partner Desk',
    email: 'events@example.com',
    company: 'EventWorks',
    message: 'Looking to reserve the rooftop for a corporate mixer next month.',
    createdAt: '2026-05-08T12:00:00+05:30'
  }
];

export const clubs: LegacyClub[] = venues.map((venue) => ({
  id: venue.id,
  name: venue.name,
  location: `${venue.neighborhood}, ${venue.city}`
}));

export const packages: LegacyPackage[] = events.map((event, index) => ({
  id: `pkg-${index + 1}`,
  clubId: event.venueId,
  name: `${event.title} Package`,
  description: event.description,
  price: event.ticketPrice,
  includesDrinks: index % 2 === 0,
  includesTransport: index % 3 === 0
}));

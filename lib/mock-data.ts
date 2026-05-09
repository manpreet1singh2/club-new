import type { Club, Package, Driver, User, Booking } from "./types"

export const clubs: Club[] = [
  {
    id: "1",
    name: "Skyline Lounge",
    location: "123 Main St, Downtown, New York",
    description: "Experience the ultimate nightlife at Skyline Lounge, featuring panoramic city views, world-class DJs, premium bottle service, and an unforgettable atmosphere. Our rooftop venue offers the perfect blend of sophistication and excitement.",
    ownerId: "owner1",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    features: ["Rooftop Terrace", "VIP Tables", "Premium Bar", "Dance Floor", "Live DJs", "Private Events"],
    hours: {
      monday: "Closed",
      tuesday: "8:00 PM - 2:00 AM",
      wednesday: "8:00 PM - 2:00 AM",
      thursday: "8:00 PM - 3:00 AM",
      friday: "8:00 PM - 4:00 AM",
      saturday: "8:00 PM - 4:00 AM",
      sunday: "8:00 PM - 1:00 AM",
    },
  },
  {
    id: "2",
    name: "Pulse Nightclub",
    location: "456 Beach Blvd, Miami Beach, Florida",
    description: "The heart of Miami's nightlife. High-energy dance floor, state-of-the-art sound system, and the world's top DJs.",
    ownerId: "owner2",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=400",
    images: ["/placeholder.svg?height=400&width=800"],
    features: ["Massive Dance Floor", "LED Light Show", "International DJs"],
    hours: {
      friday: "10:00 PM - 5:00 AM",
      saturday: "10:00 PM - 5:00 AM",
    },
  },
]

export const packages: Package[] = [
  {
    id: "p1",
    clubId: "1",
    name: "Entry Only",
    price: 50,
    description: "Standard entry to the club.",
    includesTransport: false,
    includesDrinks: false,
  },
  {
    id: "p2",
    clubId: "1",
    name: "Entry + Drinks",
    price: 120,
    description: "Entry plus 3 drink vouchers.",
    includesTransport: false,
    includesDrinks: true,
  },
  {
    id: "p3",
    clubId: "1",
    name: "Entry + Cab",
    price: 100,
    description: "Entry plus one-way cab service within 10 miles.",
    includesTransport: true,
    includesDrinks: false,
  },
  {
    id: "p4",
    clubId: "1",
    name: "Full Combo",
    price: 200,
    description: "Entry, 5 drinks, and round-trip transport.",
    includesTransport: true,
    includesDrinks: true,
  },
]

export const drivers: Driver[] = [
  {
    id: "d1",
    name: "James Wilson",
    phone: "+1234567890",
    vehicleType: "cab",
    vehicleNumber: "NY-BK-1234",
    available: true,
  },
  {
    id: "d2",
    name: "Sarah Chen",
    phone: "+1987654321",
    vehicleType: "bike",
    vehicleNumber: "NY-BK-5678",
    available: true,
  },
]

export const currentUser: User = {
  id: "u1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1555000111",
  role: "customer",
}

export const events = [
  {
    id: "e1",
    title: "Neon Nights Festival",
    clubId: "1",
    clubName: "Skyline Lounge",
    date: "Friday, May 15",
    time: "10:00 PM",
    image: "/placeholder.svg?height=400&width=600",
    tag: "Live Music"
  },
  {
    id: "e2",
    title: "Underground Techno",
    clubId: "2",
    clubName: "Pulse Nightclub",
    date: "Saturday, May 16",
    time: "11:00 PM",
    image: "/placeholder.svg?height=400&width=600",
    tag: "Techno"
  },
  {
    id: "e3",
    title: "VIP Champagne Gala",
    clubId: "1",
    clubName: "Skyline Lounge",
    date: "Thursday, May 21",
    time: "9:00 PM",
    image: "/placeholder.svg?height=400&width=600",
    tag: "VIP Only"
  },
]

export const allBookings: Booking[] = [
  {
    id: "1",
    bookingId: "BK-1234",
    userId: "John Doe",
    clubId: "1",
    packageId: "Full Combo",
    date: "2026-05-18",
    time: "10:00 PM",
    numPeople: 4,
    transportType: "cab",
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 200,
    paidAmount: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    bookingId: "BK-5678",
    userId: "Alice Smith",
    clubId: "1",
    packageId: "Entry Only",
    date: "2026-05-18",
    time: "9:30 PM",
    numPeople: 2,
    transportType: "none",
    status: "pending",
    paymentStatus: "paid",
    totalAmount: 50,
    paidAmount: 7.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    bookingId: "BK-9012",
    userId: "Mike Ross",
    clubId: "2",
    packageId: "Entry + Drinks",
    date: "2026-05-19",
    time: "11:00 PM",
    numPeople: 5,
    transportType: "cab",
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 150,
    paidAmount: 22.5,
    createdAt: new Date().toISOString(),
  },
]

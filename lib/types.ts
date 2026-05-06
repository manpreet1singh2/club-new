export type UserRole = "customer" | "owner" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
}

export interface Club {
  id: string
  name: string
  location: string
  description: string
  ownerId: string
  rating: number
  image: string
  images: string[]
  features: string[]
  hours: Record<string, string>
}

export interface Package {
  id: string
  clubId: string
  name: string
  price: number
  description: string
  includesTransport: boolean
  includesDrinks: boolean
}

export type TransportType = "cab" | "bike" | "none"
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed"
export type PaymentStatus = "pending" | "paid" | "failed"

export interface Booking {
  id: string
  bookingId: string // Unique human-readable ID
  userId: string
  clubId: string
  packageId: string
  date: string
  time: string
  numPeople: number
  transportType: TransportType
  pickupLocation?: string
  paymentStatus: PaymentStatus
  status: BookingStatus
  createdAt: string
  totalAmount: number
  paidAmount: number
}

export interface Driver {
  id: string
  name: string
  phone: string
  vehicleType: "cab" | "bike"
  vehicleNumber: string
  available: boolean
}

export interface TransportAssignment {
  id: string
  bookingId: string
  driverId: string
  pickupTime: string
  status: "assigned" | "completed"
}

export interface Notification {
  id: string
  bookingId: string
  type: "customer" | "owner" | "driver"
  message: string
  status: "sent" | "failed"
  createdAt: string
}

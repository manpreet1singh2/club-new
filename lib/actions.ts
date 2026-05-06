import type { Booking, BookingStatus, PaymentStatus, TransportType } from "./types"

/**
 * Mock function to simulate creating a booking in the database
 */
export async function createBooking(data: {
  userId: string
  clubId: string
  packageId: string
  date: string
  time: string
  numPeople: number
  transportType: TransportType
  pickupLocation?: string
  totalAmount: number
  paidAmount: number
}): Promise<Booking> {
  const id = Math.random().toString(36).substring(2, 11)
  const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()

  const newBooking: Booking = {
    id,
    bookingId,
    ...data,
    status: "pending",
    paymentStatus: "paid", // Assuming advance payment was successful
    createdAt: new Date().toISOString(),
  }

  console.log("Booking created successfully:", newBooking)
  return newBooking
}

/**
 * Mock function to update booking status
 */
export async function updateBookingStatus(id: string, status: BookingStatus): Promise<boolean> {
  console.log(`Updating booking ${id} status to ${status}`)
  return true
}

/**
 * Mock function to simulate payment verification
 */
export async function verifyPayment(transactionId: string): Promise<PaymentStatus> {
  console.log(`Verifying payment for transaction ${transactionId}`)
  return "paid"
}

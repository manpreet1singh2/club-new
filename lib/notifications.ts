import type { Booking, Driver, Club } from "./types"

/**
 * Mock service to simulate sending WhatsApp notifications
 */
export const notificationService = {
  /**
   * Send confirmation to customer
   */
  async sendToCustomer(booking: Booking, club: Club) {
    const message = `
      Hi ${booking.userId}!
      Your booking at ${club.name} is confirmed.
      Booking ID: #${booking.bookingId}
      Date: ${booking.date}
      Time: ${booking.time}
      Package: ${booking.packageId}
      ${booking.transportType !== 'none' ? `Pickup scheduled from: ${booking.pickupLocation}` : ''}
      See you there!
    `
    console.log("--- WhatsApp to CUSTOMER ---")
    console.log(message)
    return true
  },

  /**
   * Send alert to club owner
   */
  async sendToOwner(booking: Booking, club: Club) {
    const message = `
      New Booking Alert for ${club.name}!
      Booking ID: #${booking.bookingId}
      Customer: ${booking.userId}
      Date: ${booking.date}
      Time: ${booking.time}
      People: ${booking.numPeople}
      Package: ${booking.packageId}
      Transport: ${booking.transportType}
    `
    console.log("--- WhatsApp to CLUB OWNER ---")
    console.log(message)
    return true
  },

  /**
   * Send alert to driver
   */
  async sendToDriver(booking: Booking, driver: Driver) {
    if (booking.transportType === 'none') return false

    const message = `
      New Pickup Assigned!
      Driver: ${driver.name}
      Customer Phone: ${booking.userId}
      Pickup Location: ${booking.pickupLocation}
      Pickup Time: ${booking.time} (Suggested 45 mins before)
      Destination: Club Location
    `
    console.log("--- WhatsApp to DRIVER ---")
    console.log(message)
    return true
  }
}

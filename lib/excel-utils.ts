import type { Booking } from "./types"

/**
 * Converts an array of booking objects into a CSV string
 */
export function convertToCSV(bookings: Booking[]): string {
  if (bookings.length === 0) return ""

  const headers = [
    "ID",
    "Booking ID",
    "Venue ID",
    "Event ID",
    "Guest Name",
    "Email",
    "Phone",
    "Party Size",
    "Arrival Time",
    "Notes",
    "Status",
    "Source",
    "Payment Status",
    "Advance Amount",
    "Paid Amount",
    "Transport Type",
    "Pickup Location",
    "Transport Status",
    "WhatsApp Opt In",
    "Created At"
  ]

  const rows = bookings.map((b) => [
    b.id,
    b.bookingId,
    b.venueId,
    b.eventId,
    b.guestName,
    b.email,
    b.phone,
    b.partySize,
    b.arrivalTime,
    b.notes,
    b.status,
    b.source,
    b.paymentStatus ?? "N/A",
    b.advanceAmount ?? "N/A",
    b.paidAmount ?? "N/A",
    b.transportType ?? "N/A",
    b.pickupLocation ?? "N/A",
    b.transportStatus ?? "N/A",
    b.whatsappOptIn ?? "N/A",
    b.createdAt
  ])

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
}

/**
 * Triggers a file download of a CSV string in the browser
 */
export function downloadCSV(csvContent: string, filename: string): void {
  if (typeof window === "undefined") return

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

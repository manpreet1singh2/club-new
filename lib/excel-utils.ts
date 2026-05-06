import type { Booking } from "./types"

/**
 * Converts an array of booking objects into a CSV string
 */
export function convertToCSV(bookings: Booking[]): string {
  if (bookings.length === 0) return ""

  const headers = [
    "Booking ID",
    "User ID",
    "Club ID",
    "Package ID",
    "Date",
    "Time",
    "Num People",
    "Transport Type",
    "Pickup Location",
    "Status",
    "Payment Status",
    "Total Amount",
    "Paid Amount",
    "Created At"
  ]

  const rows = bookings.map((b) => [
    b.bookingId,
    b.userId,
    b.clubId,
    b.packageId,
    b.date,
    b.time,
    b.numPeople,
    b.transportType,
    b.pickupLocation || "N/A",
    b.status,
    b.paymentStatus,
    b.totalAmount,
    b.paidAmount,
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

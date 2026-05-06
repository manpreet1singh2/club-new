"use client"

import Link from "next/link"
import { CheckCircle2, Download, Home, MapPin, QrCode, Share2, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { useState, useEffect } from "react"

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setBookingId(p.id))
  }, [params])

  if (!bookingId) return null

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Ticket className="h-6 w-6 text-primary" />
            <span>ClubSpot</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              My Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl py-8 md:py-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your booking at <span className="font-semibold text-foreground">Skyline Lounge</span> has been successfully reserved.
            A confirmation message has been sent to your WhatsApp.
          </p>
        </div>

        <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
          <div className="bg-primary p-6 text-primary-foreground flex justify-between items-center">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">Booking ID</p>
              <h2 className="text-2xl font-black tracking-wider">#{bookingId}</h2>
            </div>
            <Ticket className="h-12 w-12 text-primary-foreground/40 rotate-12" />
          </div>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Date</p>
                <p className="font-semibold">May 18, 2024</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Time</p>
                <p className="font-semibold">10:00 PM</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Guest</p>
                <p className="font-semibold">John Doe</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Party Size</p>
                <p className="font-semibold">4 People</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Package</p>
              <p className="font-semibold">Full Combo (Entry + Drinks + Cab)</p>
            </div>

            <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-bold">Pickup Scheduled</p>
                <p className="text-sm text-muted-foreground">9:15 PM from Sector 17, Chandigarh</p>
                <p className="text-xs text-primary font-medium mt-1">Driver details will be shared 1 hour before pickup.</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center pt-4 space-y-4">
              <div className="p-4 bg-white rounded-xl border-2 border-muted flex items-center justify-center">
                <QrCode className="h-40 w-40" />
              </div>
              <p className="text-sm text-muted-foreground">Scan this QR code at the club entrance</p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-6 flex flex-wrap gap-3 justify-center border-t">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild variant="ghost" className="flex-1">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/dashboard">
              View All Bookings
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

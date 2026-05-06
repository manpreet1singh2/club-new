"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Music,
  Navigation,
  Ticket,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { clubs, packages } from "@/lib/mock-data"
import type { TransportType } from "@/lib/types"

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [clubId, setClubId] = useState<string | null>(null)

  useState(() => {
    params.then(p => setClubId(p.id))
  })

  if (!clubId) return null
  const club = clubs.find((c) => c.id === clubId) || clubs[0]
  const clubPackages = packages.filter((p) => p.clubId === clubId)

  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("22:00")
  const [numPeople, setNumPeople] = useState("2")
  const [selectedPackageId, setSelectedPackageId] = useState(clubPackages[0]?.id || "")
  const [transportType, setTransportType] = useState<TransportType>("none")
  const [pickupLocation, setPickupLocation] = useState("")

  const selectedPackage = packages.find((p) => p.id === selectedPackageId)
  const totalAmount = selectedPackage?.price || 0
  const advancePayment = totalAmount * 0.15

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const handleBooking = () => {
    // In a real app, this would call an API action
    const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()
    router.push(`/booking/confirmation/${bookingId}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Ticket className="h-6 w-6 text-primary" />
            <span>ClubSpot</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className={step >= 1 ? "text-primary" : "text-muted-foreground"}>Plan</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className={step >= 2 ? "text-primary" : "text-muted-foreground"}>Package</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className={step >= 3 ? "text-primary" : "text-muted-foreground"}>Transport</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className={step >= 4 ? "text-primary" : "text-muted-foreground"}>Payment</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl py-8 md:py-12">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => (step === 1 ? router.back() : prevStep())}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <div className="text-right">
            <h1 className="text-2xl font-bold">{club.name}</h1>
            <p className="text-sm text-muted-foreground">{club.location}</p>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>When are you planning to visit?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of People</Label>
                    <Select value={numPeople} onValueChange={setNumPeople}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select party size" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} {n === 1 ? "Person" : "People"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={nextStep}>
                Continue to Packages
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Package</CardTitle>
              <CardDescription>Choose the best option for your night out.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPackageId} onValueChange={setSelectedPackageId} className="grid gap-4">
                {clubPackages.map((pkg) => (
                  <Label
                    key={pkg.id}
                    htmlFor={pkg.id}
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedPackageId === pkg.id ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                      <div>
                        <div className="font-bold">{pkg.name}</div>
                        <div className="text-sm text-muted-foreground">{pkg.description}</div>
                        <div className="mt-2 flex gap-2">
                          {pkg.includesDrinks && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                              <Music className="mr-1 h-3 w-3" /> Drinks Included
                            </span>
                          )}
                          {pkg.includesTransport && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              <Navigation className="mr-1 h-3 w-3" /> Transport Option
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">${pkg.price}</div>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={nextStep}>
                Continue to Transport
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Transport Options</CardTitle>
              <CardDescription>Would you like to book a ride to the club?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={transportType}
                onValueChange={(val) => setTransportType(val as TransportType)}
                className="grid gap-4 md:grid-cols-3"
              >
                <Label
                  htmlFor="none"
                  className={`flex flex-col items-center justify-center rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    transportType === "none" ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value="none" id="none" className="sr-only" />
                  <Users className="mb-2 h-6 w-6" />
                  <span className="font-medium">No Transport</span>
                </Label>
                <Label
                  htmlFor="cab"
                  className={`flex flex-col items-center justify-center rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    transportType === "cab" ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value="cab" id="cab" className="sr-only" />
                  <Navigation className="mb-2 h-6 w-6" />
                  <span className="font-medium">Book a Cab</span>
                </Label>
                <Label
                  htmlFor="bike"
                  className={`flex flex-col items-center justify-center rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    transportType === "bike" ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value="bike" id="bike" className="sr-only" />
                  <Navigation className="mb-2 h-6 w-6" />
                  <span className="font-medium">Book a Bike</span>
                </Label>
              </RadioGroup>

              {transportType !== "none" && (
                <div className="space-y-2">
                  <Label htmlFor="location">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter your address for pickup"
                      className="pl-10"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Driver details will be sent via WhatsApp after booking.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={nextStep}>
                Continue to Payment
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Please review your booking details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-muted-foreground">Club</div>
                  <div className="font-medium text-right">{club.name}</div>
                  <div className="text-muted-foreground">Date & Time</div>
                  <div className="font-medium text-right">
                    {date?.toLocaleDateString()} at {time}
                  </div>
                  <div className="text-muted-foreground">People</div>
                  <div className="font-medium text-right">{numPeople}</div>
                  <div className="text-muted-foreground">Package</div>
                  <div className="font-medium text-right">{selectedPackage?.name}</div>
                  <div className="text-muted-foreground">Transport</div>
                  <div className="font-medium text-right capitalize">{transportType}</div>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Amount</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg flex justify-between items-center text-primary">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    <span className="font-bold">15% Advance Due Now</span>
                  </div>
                  <span className="text-xl font-black">${advancePayment.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your payment information (Mock Payment).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12 text-lg" onClick={handleBooking}>
                  Pay ${advancePayment.toFixed(2)} & Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

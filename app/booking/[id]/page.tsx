"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Bike
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
import { Badge } from "@/components/ui/badge"
import { clubs, packages, currentUser } from "@/lib/mock-data"
import type { TransportType } from "@/lib/types"
import { createBooking } from "@/lib/actions"
import { notificationService } from "@/lib/notifications"

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: clubId } = use(params)
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("22:00")
  const [numPeople, setNumPeople] = useState("2")
  const [selectedPackageId, setSelectedPackageId] = useState("")
  const [transportType, setTransportType] = useState<TransportType>("none")
  const [pickupLocation, setPickupLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (clubId) {
      const clubPackages = packages.filter((p) => p.clubId === clubId)
      if (clubPackages.length > 0 && !selectedPackageId) {
        setSelectedPackageId(clubPackages[0].id)
      }
    }
  }, [clubId, selectedPackageId])

  if (!clubId) return null

  const club = clubs.find((c) => c.id === clubId) || clubs[0]
  const clubPackages = packages.filter((p) => p.clubId === clubId)
  const selectedPackage = packages.find((p) => p.id === selectedPackageId)
  const totalAmount = selectedPackage?.price || 0
  const advancePayment = totalAmount * 0.15

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  const handleBooking = async () => {
    setIsSubmitting(true)
    try {
        const booking = await createBooking({
          userId: currentUser.name,
          clubId: club.id,
          packageId: selectedPackage?.name || "Standard",
          date: date?.toLocaleDateString() || "",
          time: time,
          numPeople: parseInt(numPeople),
          transportType: transportType,
          pickupLocation: pickupLocation,
          totalAmount: totalAmount,
          paidAmount: advancePayment,
        })

        await notificationService.sendToCustomer(booking, club)
        await notificationService.sendToOwner(booking, club)

        router.push(`/booking/confirmation/${booking.bookingId}`)
    } finally {
        setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, label: "Schedule", icon: Clock },
    { number: 2, label: "Experience", icon: Music },
    { number: 3, label: "Arrive", icon: Navigation },
    { number: 4, label: "Secure", icon: ShieldCheck }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-50 w-full glassmorphism border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1.5 rounded-lg">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline-flex text-gradient">ClubSpot</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-8">
            {steps.map((s) => (
              <div key={s.number} className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${step >= s.number ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"}`}>
                  {step > s.number ? <CheckCircle2 className="h-4 w-4" /> : s.number}
                </div>
                <span className={`hidden md:inline-flex text-xs font-bold uppercase tracking-widest ${step >= s.number ? "text-primary" : "text-muted-foreground opacity-50"}`}>
                  {s.label}
                </span>
                {s.number < 4 && <ChevronRight className="hidden sm:inline-flex h-3 w-3 text-muted-foreground/30" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl py-8 md:py-16 px-4 md:px-6">
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Button variant="ghost" size="sm" className="rounded-full bg-background/50 hover:bg-background shadow-sm border px-6" onClick={() => (step === 1 ? router.back() : prevStep())}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-left sm:text-right space-y-1">
            <h1 className="text-3xl font-black tracking-tight">{club.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center sm:justify-end gap-1 font-medium">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {club.location}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden">
                <CardHeader className="p-8 md:p-12 bg-primary/5">
                  <CardTitle className="text-3xl font-black">Plan Your Visit</CardTitle>
                  <CardDescription className="text-lg">Select the perfect date and time for your group.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12 space-y-10">
                  <div className="grid gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-[0.2em] text-primary">1. Select Date</Label>
                      <div className="p-2 border-2 rounded-3xl bg-muted/10">
                         <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-2xl" />
                      </div>
                    </div>
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-[0.2em] text-primary">2. Arrival Time</Label>
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger className="h-16 rounded-2xl border-2 text-lg font-bold focus:border-primary transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl">
                            <SelectItem value="20:00">8:00 PM</SelectItem>
                            <SelectItem value="21:00">9:00 PM</SelectItem>
                            <SelectItem value="22:00">10:00 PM</SelectItem>
                            <SelectItem value="23:00">11:00 PM</SelectItem>
                            <SelectItem value="00:00">12:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-xs font-black uppercase tracking-[0.2em] text-primary">3. Group Size</Label>
                        <Select value={numPeople} onValueChange={setNumPeople}>
                          <SelectTrigger className="h-16 rounded-2xl border-2 text-lg font-bold focus:border-primary transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl">
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
                <CardFooter className="p-8 md:p-12 pt-0">
                  <Button size="xl" className="w-full rounded-2xl group shadow-xl shadow-primary/20" onClick={nextStep}>
                    Continue to Experience
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden">
                <CardHeader className="p-8 md:p-12 bg-primary/5 text-center">
                  <CardTitle className="text-3xl font-black">Choose Your Experience</CardTitle>
                  <CardDescription className="text-lg">Curated packages designed for the ultimate night out.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12">
                  <RadioGroup value={selectedPackageId} onValueChange={setSelectedPackageId} className="grid gap-6">
                    {clubPackages.map((pkg) => (
                      <Label
                        key={pkg.id}
                        htmlFor={pkg.id}
                        className={`group relative flex items-center justify-between rounded-3xl border-2 p-8 cursor-pointer transition-all duration-300 hover:border-primary/50 ${
                          selectedPackageId === pkg.id ? "border-primary bg-primary/5 ring-4 ring-primary/10 shadow-xl shadow-primary/5" : "border-muted bg-background"
                        }`}
                      >
                        <div className="flex items-start gap-6">
                          <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                          <div className="space-y-3">
                            <div>
                                <div className="text-2xl font-black tracking-tight">{pkg.name}</div>
                                <div className="text-muted-foreground font-medium">{pkg.description}</div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {pkg.includesDrinks && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                                  <Music className="mr-1.5 h-3.5 w-3.5" /> Premium Bar Access
                                </Badge>
                              )}
                              {pkg.includesTransport && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">
                                  <Navigation className="mr-1.5 h-3.5 w-3.5" /> Transport Included
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Price</div>
                            <div className="text-4xl font-black tracking-tighter">${pkg.price}</div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="p-8 md:p-12 pt-0">
                  <Button size="xl" className="w-full rounded-2xl group shadow-xl shadow-primary/20" onClick={nextStep}>
                    Continue to Transport
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden">
                <CardHeader className="p-8 md:p-12 bg-primary/5 text-center">
                  <CardTitle className="text-3xl font-black">Transport Options</CardTitle>
                  <CardDescription className="text-lg">Arrive in style with our automated booking system.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 md:p-12 space-y-12">
                  <RadioGroup
                    value={transportType}
                    onValueChange={(val) => setTransportType(val as TransportType)}
                    className="grid gap-6 md:grid-cols-3"
                  >
                    {[
                      { type: "none", label: "No Transport", icon: Users, desc: "Arrive on your own" },
                      { type: "cab", label: "Premium Cab", icon: Navigation, desc: "Luxury sedan" },
                      { type: "bike", label: "Bike Taxi", icon: Bike, desc: "Fast & efficient" }
                    ].map((opt) => (
                        <Label
                          key={opt.type}
                          htmlFor={opt.type}
                          className={`flex flex-col items-center justify-center rounded-3xl border-2 p-8 cursor-pointer transition-all duration-300 hover:border-primary/50 text-center gap-4 ${
                            transportType === opt.type ? "border-primary bg-primary/5 shadow-xl shadow-primary/5" : "border-muted bg-background"
                          }`}
                        >
                          <RadioGroupItem value={opt.type} id={opt.type} className="sr-only" />
                          <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all ${transportType === opt.type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                             <opt.icon className="h-8 w-8" />
                          </div>
                          <div>
                            <div className="font-black text-xl leading-tight">{opt.label}</div>
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">{opt.desc}</div>
                          </div>
                        </Label>
                    ))}
                  </RadioGroup>

                  <AnimatePresence>
                      {transportType !== "none" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden"
                        >
                          <Label htmlFor="location" className="text-xs font-black uppercase tracking-[0.2em] text-primary">Enter Pickup Address</Label>
                          <div className="relative group">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                              id="location"
                              placeholder="e.g. Sector 17, Chandigarh"
                              className="h-16 pl-14 pr-6 rounded-2xl border-2 text-lg font-bold focus:border-primary shadow-lg shadow-black/5"
                              value={pickupLocation}
                              onChange={(e) => setPickupLocation(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2 items-center bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 text-yellow-700 text-sm font-medium">
                              <Zap className="h-4 w-4" />
                              Driver details will be shared automatically 1 hour before pickup via WhatsApp.
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="p-8 md:p-12 pt-0">
                  <Button size="xl" className="w-full rounded-2xl group shadow-xl shadow-primary/20" onClick={nextStep}>
                    Review & Pay
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-8 md:grid-cols-12"
            >
              <div className="md:col-span-7 space-y-8">
                  <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden">
                    <CardHeader className="p-8 bg-primary/5">
                        <CardTitle className="text-2xl font-black tracking-tight">Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="grid grid-cols-2 gap-y-6 text-sm">
                          <div className="text-muted-foreground font-bold uppercase tracking-widest">Venue</div>
                          <div className="font-black text-right text-lg">{club.name}</div>

                          <div className="text-muted-foreground font-bold uppercase tracking-widest">Date & Time</div>
                          <div className="font-black text-right text-lg">
                            {date?.toLocaleDateString()} • {time}
                          </div>

                          <div className="text-muted-foreground font-bold uppercase tracking-widest">Group Size</div>
                          <div className="font-black text-right text-lg">{numPeople} People</div>

                          <div className="text-muted-foreground font-bold uppercase tracking-widest">Experience</div>
                          <div className="font-black text-right text-lg">{selectedPackage?.name}</div>

                          <div className="text-muted-foreground font-bold uppercase tracking-widest">Transport</div>
                          <div className="font-black text-right text-lg capitalize">{transportType}</div>
                        </div>

                        <Separator className="bg-muted/50" />

                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total Value</span>
                                <div className="text-4xl font-black tracking-tighter">${totalAmount}</div>
                            </div>
                            <div className="text-right space-y-1">
                                <div className="bg-primary/10 text-primary font-black px-4 py-2 rounded-2xl text-xl tracking-tight flex items-center gap-2">
                                    <ShieldCheck className="h-6 w-6" />
                                    ${advancePayment.toFixed(2)}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 pr-2">15% Secure Advance Due</p>
                            </div>
                        </div>
                    </CardContent>
                  </Card>

                  <div className="bg-background/50 border rounded-3xl p-6 flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                         <ShieldCheck className="h-6 w-6" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        Your data is encrypted and secure. The 15% advance payment is mandatory to guarantee your reservation and schedule your transport.
                      </p>
                  </div>
              </div>

              <div className="md:col-span-5">
                  <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden sticky top-28">
                    <CardHeader className="p-8 text-center bg-muted/5">
                        <CardTitle className="text-2xl font-black tracking-tight">Payment Details</CardTitle>
                        <CardDescription className="font-medium">Complete your secure checkout</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cardholder Name</Label>
                              <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Card Number</Label>
                              <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input className="h-14 pl-12 rounded-2xl border-2 font-bold focus:border-primary" placeholder="0000 0000 0000 0000" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expiry</Label>
                                <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary text-center" placeholder="MM / YY" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CVV</Label>
                                <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary text-center" placeholder="***" type="password" />
                              </div>
                            </div>
                        </div>

                        <Button
                            size="xl"
                            className="w-full rounded-2xl group shadow-xl shadow-primary/30 h-16 text-xl mt-4"
                            onClick={handleBooking}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Zap className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    Confirm & Pay
                                    <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                        <p className="text-[10px] text-center font-bold text-muted-foreground tracking-widest uppercase mt-4">Powered by Stripe & Razorpay</p>
                    </CardContent>
                  </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

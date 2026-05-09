"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  Share2,
  Star,
  Ticket,
  Users,
  Info,
  Music,
  Image as ImageIcon,
  ShieldCheck,
  Zap
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { clubs } from "@/lib/mock-data"

export default function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLiked, setIsLiked] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const foundClub = clubs.find(c => c.id === id) || clubs[0]

  // Mock additional data not in the main club type yet
  const club = {
    ...foundClub,
    hours: foundClub.hours || {
      monday: "Closed",
      tuesday: "8:00 PM - 2:00 AM",
      wednesday: "8:00 PM - 2:00 AM",
      thursday: "8:00 PM - 3:00 AM",
      friday: "8:00 PM - 4:00 AM",
      saturday: "8:00 PM - 4:00 AM",
      sunday: "8:00 PM - 1:00 AM",
    },
    features: foundClub.features || ["Rooftop Terrace", "VIP Tables", "Premium Bar", "Dance Floor", "Live DJs", "Private Events"],
    events: [
      {
        id: "e1",
        name: "Friday Night Live",
        date: "May 17, 2024",
        time: "10:00 PM - 4:00 AM",
        description: "Join us for a night of house music with DJ Max Power.",
        image: "/placeholder.svg?height=400&width=800",
      },
      {
        id: "e2",
        name: "Saturday Sunset Sessions",
        date: "May 18, 2024",
        time: "6:00 PM - 10:00 PM",
        description: "Enjoy sunset views with chill beats and signature cocktails.",
        image: "/placeholder.svg?height=400&width=800",
      },
    ],
    reviews: [
      {
        id: "r1",
        user: "Alex Johnson",
        rating: 5,
        date: "April 15, 2024",
        comment:
          "Amazing atmosphere and service! The views are incredible and the DJ was fantastic. Will definitely be back!",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-50 w-full glassmorphism border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1.5 rounded-lg">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">ClubSpot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="premium">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/clubs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
              <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Discover
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <section className="space-y-6">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={club.images[activeImage]}
                      alt={club.name}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex gap-2">
                    {club.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-12 h-1.5 rounded-full transition-all duration-300 ${i === activeImage ? "bg-white w-20" : "bg-white/40 hover:bg-white/60"}`}
                      />
                    ))}
                  </div>
                  <div className="absolute top-6 right-6 flex gap-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-xl"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500 border-none" : ""}`} />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-xl">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between px-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1">Featured Venue</Badge>
                       <div className="flex items-center text-yellow-500 font-bold">
                          <Star className="h-4 w-4 fill-yellow-500 mr-1" />
                          {club.rating}
                       </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">{club.name}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      <span className="text-lg">{club.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border">
                     <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                             <img src={`/placeholder-user.jpg`} alt="user" className="w-full h-full object-cover" />
                          </div>
                        ))}
                     </div>
                     <div className="text-xs font-bold text-muted-foreground pr-4">
                        <span className="text-foreground">120+</span> people booked today
                     </div>
                  </div>
                </div>
              </section>

              <Tabs defaultValue="about" className="w-full">
                <div className="border-b mb-8">
                  <TabsList className="bg-transparent h-auto p-0 gap-8">
                    {["about", "events", "reviews", "photos"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="bg-transparent px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary font-bold transition-all capitalize"
                      >
                        {tab === "about" && <Info className="w-4 h-4 mr-2" />}
                        {tab === "events" && <Ticket className="w-4 h-4 mr-2" />}
                        {tab === "reviews" && <Star className="w-4 h-4 mr-2" />}
                        {tab === "photos" && <ImageIcon className="w-4 h-4 mr-2" />}
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                <TabsContent value="about" className="mt-0 space-y-12 focus-visible:outline-none">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">About the Venue</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                      {club.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Premium Features
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        {club.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                               <ShieldCheck className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Opening Hours
                      </h2>
                      <div className="space-y-3 p-6 rounded-3xl border bg-muted/10">
                        {Object.entries(club.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between items-center">
                            <span className="capitalize font-medium">{day}</span>
                            <span className={`text-sm ${hours === "Closed" ? "text-destructive font-bold" : "text-muted-foreground"}`}>{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="events" className="mt-0 space-y-8 focus-visible:outline-none">
                  <div className="grid gap-6">
                    {club.events.map((event) => (
                      <Card key={event.id} className="overflow-hidden rounded-3xl border-none shadow-lg group">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
                            <img src={event.image} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          </div>
                          <CardContent className="p-8 flex-1 space-y-4">
                            <div className="space-y-1">
                              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none mb-2">{event.date}</Badge>
                              <h3 className="text-2xl font-black">{event.name}</h3>
                              <p className="text-muted-foreground font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4" /> {event.time}
                              </p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                            <Button className="rounded-xl font-bold px-8">Get Tickets</Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-0 space-y-8 focus-visible:outline-none">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-black">Guest Reviews</h2>
                      <p className="text-muted-foreground font-medium">Based on 1,200+ verified bookings</p>
                    </div>
                    <Button className="rounded-2xl font-bold h-12 px-6">Write a Review</Button>
                  </div>
                  <div className="space-y-6">
                    {club.reviews.map((review) => (
                      <Card key={review.id} className="p-8 rounded-3xl border-none shadow-lg bg-muted/20">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold">{review.user}</h4>
                              <p className="text-xs text-muted-foreground font-medium">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "opacity-30"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="photos" className="mt-0 focus-visible:outline-none">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg group relative">
                        <img src={`/placeholder.svg?height=400&width=400`} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-4">
              <aside className="sticky top-28 space-y-6">
                <Card className="border-2 border-primary/10 shadow-2xl overflow-hidden rounded-[2.5rem]">
                  <CardHeader className="bg-primary/5 p-8">
                    <CardTitle className="text-2xl font-black">Book a Table</CardTitle>
                    <CardDescription className="text-base">Reserve your premium spot for an unforgettable night.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Select Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full h-14 justify-start text-left font-bold rounded-2xl border-2 hover:border-primary transition-all">
                              <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                              {date ? date.toDateString() : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden" align="start">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Time</Label>
                           <Select>
                             <SelectTrigger className="h-14 rounded-2xl border-2 font-bold focus:border-primary transition-all">
                               <SelectValue placeholder="Time" />
                             </SelectTrigger>
                             <SelectContent className="rounded-2xl">
                               <SelectItem value="22:00">10:00 PM</SelectItem>
                               <SelectItem value="23:00">11:00 PM</SelectItem>
                               <SelectItem value="00:00">12:00 AM</SelectItem>
                             </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Size</Label>
                           <Select>
                             <SelectTrigger className="h-14 rounded-2xl border-2 font-bold focus:border-primary transition-all">
                               <SelectValue placeholder="Guests" />
                             </SelectTrigger>
                             <SelectContent className="rounded-2xl">
                               {[2, 4, 6, 8, 10].map(n => (
                                 <SelectItem key={n} value={n.toString()}>{n} People</SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Link href={`/booking/${id}`} className="w-full">
                      <Button size="xl" className="w-full rounded-2xl group shadow-xl shadow-primary/30">
                        Check Availability
                        <Zap className="ml-2 h-5 w-5 fill-current transition-transform group-hover:scale-125" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="rounded-[2.5rem] border-muted/50 bg-muted/5">
                  <CardHeader className="p-8 pb-0">
                    <CardTitle className="text-xl">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-4">
                    <p className="text-muted-foreground">Have questions about packages or private events?</p>
                    <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-bold">Contact Concierge</Button>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ClubSpot. Secure & Automated Nightlife.
            </p>
            <div className="flex gap-8">
               <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Terms</Link>
               <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

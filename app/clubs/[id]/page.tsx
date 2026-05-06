"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronLeft, Clock, Heart, MapPin, Share2, Star, Ticket, Users } from "lucide-react"

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

import { useEffect } from "react"

export default function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setId(p.id))
  }, [params])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isLiked, setIsLiked] = useState(false)

  if (!id) return null

  // In a real app, we would fetch the club data based on the ID
  const club = {
    id: id,
    name: "Skyline Lounge",
    rating: 4.8,
    location: "123 Main St, Downtown, New York",
    description:
      "Experience the ultimate nightlife at Skyline Lounge, featuring panoramic city views, world-class DJs, premium bottle service, and an unforgettable atmosphere. Our rooftop venue offers the perfect blend of sophistication and excitement.",
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
    hours: {
      monday: "Closed",
      tuesday: "8:00 PM - 2:00 AM",
      wednesday: "8:00 PM - 2:00 AM",
      thursday: "8:00 PM - 3:00 AM",
      friday: "8:00 PM - 4:00 AM",
      saturday: "8:00 PM - 4:00 AM",
      sunday: "8:00 PM - 1:00 AM",
    },
    features: ["Rooftop Terrace", "VIP Tables", "Premium Bar", "Dance Floor", "Live DJs", "Private Events"],
    events: [
      {
        id: "e1",
        name: "Friday Night Live",
        date: "May 17, 2024",
        time: "10:00 PM - 4:00 AM",
        description: "Join us for a night of house music with DJ Max Power.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "e2",
        name: "Saturday Sunset Sessions",
        date: "May 18, 2024",
        time: "6:00 PM - 10:00 PM",
        description: "Enjoy sunset views with chill beats and signature cocktails.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "e3",
        name: "Industry Night",
        date: "May 21, 2024",
        time: "9:00 PM - 2:00 AM",
        description: "Special discounts for hospitality workers with valid ID.",
        image: "/placeholder.svg?height=200&width=400",
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
      {
        id: "r2",
        user: "Sarah Miller",
        rating: 4,
        date: "April 10, 2024",
        comment:
          "Great place for a night out. Drinks are a bit pricey but worth it for the experience. The staff was very friendly.",
      },
      {
        id: "r3",
        user: "Michael Brown",
        rating: 5,
        date: "April 5, 2024",
        comment:
          "Had my birthday party here and it was perfect! The VIP service was top-notch and everyone had a great time.",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Ticket className="h-6 w-6 text-primary" />
            <span>ClubSpot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/clubs" className="text-sm font-medium hover:underline underline-offset-4">
              Clubs
            </Link>
            <Link href="/events" className="text-sm font-medium hover:underline underline-offset-4">
              Events
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <Link href="/clubs" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Clubs
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={club.images[0] || "/placeholder.svg"}
                    alt={club.name}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{club.name}</h1>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="ml-1 font-medium">{club.rating}</span>
                        <span className="ml-1 text-muted-foreground">({club.reviews.length} reviews)</span>
                      </div>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{club.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/booking/${club.id}`}>
                      <Button>Book a Table</Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Plan an Event</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Plan a Private Event</DialogTitle>
                          <DialogDescription>
                            Host your special event at {club.name}. Fill out the details and our team will contact you.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="first-name">First name</Label>
                              <Input id="first-name" placeholder="Enter your first name" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="last-name">Last name</Label>
                              <Input id="last-name" placeholder="Enter your last name" />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="Enter your phone number" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="event-type">Event Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="birthday">Birthday Party</SelectItem>
                                <SelectItem value="corporate">Corporate Event</SelectItem>
                                <SelectItem value="bachelor">Bachelor/Bachelorette Party</SelectItem>
                                <SelectItem value="holiday">Holiday Party</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="event-date">Preferred Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {date ? date.toDateString() : "Select a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="guests-count">Expected Number of Guests</Label>
                            <Input id="guests-count" type="number" placeholder="Enter number of guests" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="event-details">Event Details</Label>
                            <Textarea id="event-details" placeholder="Tell us more about your event" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Request</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="mt-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Description</h2>
                      <p className="text-muted-foreground">{club.description}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Features</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {club.features.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Hours</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(club.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}</span>
                            <span className="text-muted-foreground">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="events" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {club.events.map((event) => (
                        <Card key={event.id}>
                          <CardHeader className="p-4">
                            <CardTitle className="text-lg">{event.name}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center">
                                <CalendarDays className="mr-1 h-4 w-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center mt-1">
                                <Clock className="mr-1 h-4 w-4" />
                                {event.time}
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </CardContent>
                          <CardFooter className="p-4">
                            <Button className="w-full">Get Tickets</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Reviews</h2>
                      <Button>Write a Review</Button>
                    </div>
                    <div className="space-y-4">
                      {club.reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{review.user}</h3>
                              <div className="flex items-center mt-1">
                                {Array(review.rating)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                  ))}
                                {Array(5 - review.rating)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                                  ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="mt-2 text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="photos" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {club.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`${club.name} - Photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book a Table</CardTitle>
                  <CardDescription>Reserve your spot at {club.name} for an unforgettable night.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sidebar-date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {date ? date.toDateString() : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sidebar-time">Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8:00">8:00 PM</SelectItem>
                          <SelectItem value="8:30">8:30 PM</SelectItem>
                          <SelectItem value="9:00">9:00 PM</SelectItem>
                          <SelectItem value="9:30">9:30 PM</SelectItem>
                          <SelectItem value="10:00">10:00 PM</SelectItem>
                          <SelectItem value="10:30">10:30 PM</SelectItem>
                          <SelectItem value="11:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sidebar-guests">Party Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                          <SelectItem value="5">5 people</SelectItem>
                          <SelectItem value="6">6 people</SelectItem>
                          <SelectItem value="7">7 people</SelectItem>
                          <SelectItem value="8">8 people</SelectItem>
                          <SelectItem value="9">9 people</SelectItem>
                          <SelectItem value="10">10+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/booking/${club.id}`} className="w-full">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{club.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {Object.entries(club.hours)
                          .find(
                            ([day]) =>
                              day === new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase(),
                          )
                          ?.at(1) || "Closed today"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Capacity: 250 people</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {club.events.slice(0, 2).map((event) => (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className="bg-muted rounded-md p-2 text-center min-w-[60px]">
                          <div className="text-sm font-medium">{event.date.split(",")[0].slice(0, 3)}</div>
                          <div className="text-xl font-bold">{event.date.split(" ")[1].replace(",", "")}</div>
                        </div>
                        <div>
                          <h4 className="font-medium">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="font-bold">ClubSpot</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ClubSpot. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

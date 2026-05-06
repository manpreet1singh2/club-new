"use client"

import Link from "next/link"
import { CalendarDays, MapPin, Search, Star, Ticket, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Find and Book the Best Clubs
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover top-rated clubs, reserve tables, and organize events all in one place.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search clubs, events, or locations..."
                    className="w-full bg-background pl-8 pr-4"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Near Me
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trending
                  </Button>
                  <Button variant="outline" size="sm">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    This Weekend
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Clubs</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find the perfect venue for your night out or special event.
                </p>
              </div>
              <Tabs defaultValue="featured" className="w-full max-w-4xl">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                </TabsList>
                <TabsContent value="featured" className="mt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredClubs.map((club) => (
                      <Link href={`/clubs/${club.id}`} key={club.id}>
                        <Card className="overflow-hidden transition-all hover:shadow-lg">
                          <img
                            src={club.image || "/placeholder.svg"}
                            alt={club.name}
                            className="aspect-video w-full object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{club.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="ml-1 text-sm">{club.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{club.location}</p>
                            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {club.distance}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="trending" className="mt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {trendingClubs.map((club) => (
                      <Link href={`/clubs/${club.id}`} key={club.id}>
                        <Card className="overflow-hidden transition-all hover:shadow-lg">
                          <img
                            src={club.image || "/placeholder.svg"}
                            alt={club.name}
                            className="aspect-video w-full object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{club.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="ml-1 text-sm">{club.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{club.location}</p>
                            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {club.distance}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="new" className="mt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {newClubs.map((club) => (
                      <Link href={`/clubs/${club.id}`} key={club.id}>
                        <Card className="overflow-hidden transition-all hover:shadow-lg">
                          <img
                            src={club.image || "/placeholder.svg"}
                            alt={club.name}
                            className="aspect-video w-full object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{club.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="ml-1 text-sm">{club.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{club.location}</p>
                            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {club.distance}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="nearby" className="mt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {nearbyClubs.map((club) => (
                      <Link href={`/clubs/${club.id}`} key={club.id}>
                        <Card className="overflow-hidden transition-all hover:shadow-lg">
                          <img
                            src={club.image || "/placeholder.svg"}
                            alt={club.name}
                            className="aspect-video w-full object-cover"
                          />
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{club.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                <span className="ml-1 text-sm">{club.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{club.location}</p>
                            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {club.distance}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <Button asChild className="mt-8">
                <Link href="/clubs">View All Clubs</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Book your perfect night out in just a few simple steps.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Discover</h3>
                  <p className="text-muted-foreground text-center">
                    Browse through our curated list of top clubs and venues in your area.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Book</h3>
                  <p className="text-muted-foreground text-center">
                    Reserve tables, buy tickets, or organize private events with real-time availability.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Enjoy</h3>
                  <p className="text-muted-foreground text-center">
                    Get instant confirmation and enjoy your night out hassle-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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

// Sample data
const featuredClubs = [
  {
    id: "1",
    name: "Skyline Lounge",
    rating: 4.8,
    location: "Downtown, New York",
    distance: "2.5 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    name: "Pulse Nightclub",
    rating: 4.6,
    location: "Miami Beach, Florida",
    distance: "3.2 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    name: "Echo Club",
    rating: 4.7,
    location: "Los Angeles, California",
    distance: "1.8 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const trendingClubs = [
  {
    id: "4",
    name: "Velvet Underground",
    rating: 4.9,
    location: "Chicago, Illinois",
    distance: "4.1 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    name: "Mirage",
    rating: 4.5,
    location: "Las Vegas, Nevada",
    distance: "2.7 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    name: "Azure",
    rating: 4.7,
    location: "San Francisco, California",
    distance: "3.3 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const newClubs = [
  {
    id: "7",
    name: "Elevate",
    rating: 4.4,
    location: "Austin, Texas",
    distance: "2.2 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "8",
    name: "Fusion",
    rating: 4.3,
    location: "Seattle, Washington",
    distance: "1.5 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "9",
    name: "Prism",
    rating: 4.6,
    location: "Denver, Colorado",
    distance: "3.8 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const nearbyClubs = [
  {
    id: "10",
    name: "Oasis",
    rating: 4.7,
    location: "Atlanta, Georgia",
    distance: "0.8 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "11",
    name: "Euphoria",
    rating: 4.5,
    location: "Boston, Massachusetts",
    distance: "1.2 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "12",
    name: "Vibe",
    rating: 4.4,
    location: "Nashville, Tennessee",
    distance: "0.5 miles away",
    image: "/placeholder.svg?height=200&width=400",
  },
]

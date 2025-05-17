"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronDown, Filter, MapPin, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0])
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <CalendarDays className="h-6 w-6 text-primary" />
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
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Location</h3>
                <Input placeholder="City, neighborhood, or address" />
              </div>
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {["Nightclub", "Lounge", "Bar", "Rooftop", "Live Music"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category}`} />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider defaultValue={[50]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex justify-between mt-2">
                  <span className="text-sm">$</span>
                  <span className="text-sm">$$$</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-muted-foreground" />
                          ))}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Features</h3>
                <div className="space-y-2">
                  {["VIP Tables", "Dance Floor", "Outdoor Seating", "Live DJ", "Private Rooms", "Food Service"].map(
                    (feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox id={`feature-${feature}`} />
                        <label
                          htmlFor={`feature-${feature}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <h1 className="text-3xl font-bold">Clubs</h1>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search clubs..."
                        className="pl-8 pr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      className="md:hidden flex items-center gap-2"
                      onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                </div>

                {/* Mobile Filters */}
                <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen} className="md:hidden">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-between w-full">
                      <span>Filters</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-medium mb-2">Location</h3>
                      <Input placeholder="City, neighborhood, or address" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Category</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {["Nightclub", "Lounge", "Bar", "Rooftop", "Live Music"].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox id={`mobile-category-${category}`} />
                            <label
                              htmlFor={`mobile-category-${category}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Price Range</h3>
                      <Slider defaultValue={[50]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">$</span>
                        <span className="text-sm">$$$</span>
                      </div>
                    </div>
                    <Button className="w-full">Apply Filters</Button>
                  </CollapsibleContent>
                </Collapsible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allClubs.map((club) => (
                    <Link href={`/clubs/${club.id}`} key={club.id}>
                      <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
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
                          <div className="mt-2 flex flex-wrap gap-1">
                            {club.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="mx-2">
                    Previous
                  </Button>
                  <Button variant="outline" className="mx-2">
                    1
                  </Button>
                  <Button className="mx-2">2</Button>
                  <Button variant="outline" className="mx-2">
                    3
                  </Button>
                  <Button variant="outline" className="mx-2">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
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
const allClubs = [
  {
    id: "1",
    name: "Skyline Lounge",
    rating: 4.8,
    location: "Downtown, New York",
    distance: "2.5 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Rooftop", "VIP Tables", "Cocktails"],
  },
  {
    id: "2",
    name: "Pulse Nightclub",
    rating: 4.6,
    location: "Miami Beach, Florida",
    distance: "3.2 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Dance", "DJ", "Late Night"],
  },
  {
    id: "3",
    name: "Echo Club",
    rating: 4.7,
    location: "Los Angeles, California",
    distance: "1.8 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Live Music", "Lounge", "Food"],
  },
  {
    id: "4",
    name: "Velvet Underground",
    rating: 4.9,
    location: "Chicago, Illinois",
    distance: "4.1 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Underground", "Techno", "Exclusive"],
  },
  {
    id: "5",
    name: "Mirage",
    rating: 4.5,
    location: "Las Vegas, Nevada",
    distance: "2.7 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Pool Party", "Celebrity DJs", "Dayclub"],
  },
  {
    id: "6",
    name: "Azure",
    rating: 4.7,
    location: "San Francisco, California",
    distance: "3.3 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Cocktails", "View", "Upscale"],
  },
  {
    id: "7",
    name: "Elevate",
    rating: 4.4,
    location: "Austin, Texas",
    distance: "2.2 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Rooftop", "Live Music", "Craft Beer"],
  },
  {
    id: "8",
    name: "Fusion",
    rating: 4.3,
    location: "Seattle, Washington",
    distance: "1.5 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Asian-Fusion", "Lounge", "Sake Bar"],
  },
  {
    id: "9",
    name: "Prism",
    rating: 4.6,
    location: "Denver, Colorado",
    distance: "3.8 miles away",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["LGBTQ+", "Dance", "Drag Shows"],
  },
]

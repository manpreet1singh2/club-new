"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CalendarDays,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  Star,
  Ticket,
  ArrowRight,
  Zap,
  LayoutGrid,
  List
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { clubs, packages } from "@/lib/mock-data"

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([200])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = (packages.find(p => p.clubId === club.id)?.price || 0) <= priceRange[0]

    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => club.features?.includes(tag))

    return matchesSearch && matchesPrice && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
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
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-12 px-4 md:px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
               <div className="space-y-2">
                  <h1 className="text-5xl font-black tracking-tight">Discover Venues</h1>
                  <p className="text-xl text-muted-foreground font-medium">Explore the best nightclubs and lounges in your city.</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="search"
                      placeholder="Search name, vibes, location..."
                      className="h-14 pl-12 pr-6 rounded-2xl border-2 w-full md:w-80 bg-background focus:border-primary shadow-xl shadow-black/5"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 p-0 md:hidden" onClick={() => setFiltersOpen(!filtersOpen)}>
                    <Filter className="h-5 w-5" />
                  </Button>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Filters Sidebar */}
              <aside className="hidden md:block w-72 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black uppercase tracking-widest text-xs text-primary">Location</h3>
                    <Badge variant="secondary" className="rounded-md">All Cities</Badge>
                  </div>
                  <Input placeholder="Enter neighborhood..." className="h-12 rounded-xl border-2 bg-background" />
                </div>

                <div className="space-y-6">
                  <h3 className="font-black uppercase tracking-widest text-xs text-primary">Experience</h3>
                  <div className="space-y-3">
                    {["VIP Tables", "Premium Bar", "Dance Floor", "Live DJs", "Rooftop Terrace"].map((category) => (
                      <div key={category} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center space-x-3">
                           <Checkbox
                              id={`category-${category}`}
                              className="h-5 w-5 rounded-md border-2"
                              checked={selectedTags.includes(category)}
                              onCheckedChange={() => toggleTag(category)}
                           />
                           <label htmlFor={`category-${category}`} className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer">{category}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black uppercase tracking-widest text-xs text-primary">Max Price</h3>
                    <span className="text-sm font-black text-primary">${priceRange[0]}</span>
                  </div>
                  <Slider defaultValue={[200]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} className="py-4" />
                </div>

                <Button className="w-full h-14 rounded-2xl font-bold shadow-xl shadow-primary/20">Apply Filters</Button>
              </aside>

              {/* Grid Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center justify-between bg-background p-2 rounded-2xl border shadow-sm">
                   <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="rounded-xl bg-muted h-9 px-4 font-bold text-xs"><LayoutGrid className="w-4 h-4 mr-2" />Grid</Button>
                      <Button variant="ghost" size="sm" className="rounded-xl h-9 px-4 font-bold text-xs text-muted-foreground"><List className="w-4 h-4 mr-2" />List</Button>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground">Sort by:</span>
                      <Select defaultValue="relevance">
                        <SelectTrigger className="h-9 border-none bg-transparent font-black text-xs focus:ring-0 w-32 uppercase tracking-widest">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="rating">Top Rated</SelectItem>
                          <SelectItem value="price-low">Budget</SelectItem>
                          <SelectItem value="price-high">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredClubs.length > 0 ? filteredClubs.map((club, index) => (
                    <motion.div
                      key={club.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/clubs/${club.id}`}>
                        <Card className="group overflow-hidden rounded-[2.5rem] border-none bg-background shadow-xl hover:shadow-2xl transition-all duration-500 h-full relative">
                          <div className="aspect-[4/3] w-full overflow-hidden relative">
                            <img
                              src={club.image || "/placeholder.svg"}
                              alt={club.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-5 right-5 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xl">
                              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                              {club.rating}
                            </div>
                            <div className="absolute bottom-5 left-5 right-5 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                               <Button className="w-full rounded-xl font-bold bg-white text-black hover:bg-white/90 shadow-xl shadow-black/20">Quick View</Button>
                            </div>
                          </div>
                          <CardContent className="p-8 space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="font-black text-2xl tracking-tight group-hover:text-primary transition-colors">{club.name}</h3>
                              <p className="text-sm text-muted-foreground font-medium flex items-center">
                                <MapPin className="mr-1.5 h-4 w-4 text-primary" />
                                {club.location}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(club.features || ["VIP", "Lounge"]).slice(0, 3).map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-muted/50 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border-none">{tag}</Badge>
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-muted/50">
                              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                2.5 miles
                              </div>
                              <Zap className="h-5 w-5 text-primary fill-primary/20" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  )) : (
                    <div className="col-span-full py-20 text-center space-y-4">
                       <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <Search className="h-10 w-10 text-muted-foreground" />
                       </div>
                       <h3 className="text-xl font-bold">No venues found</h3>
                       <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                       <Button variant="outline" onClick={() => {setSearchQuery(""); setSelectedTags([]); setPriceRange([500])}}>Clear All Filters</Button>
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center gap-2 pt-10 pb-20">
                  <Button variant="outline" className="h-12 w-12 rounded-xl border-2 p-0"><ChevronDown className="rotate-90 w-4 h-4" /></Button>
                  <Button className="h-12 w-12 rounded-xl font-black">1</Button>
                  <Button variant="ghost" className="h-12 w-12 rounded-xl font-bold text-muted-foreground">2</Button>
                  <Button variant="ghost" className="h-12 w-12 rounded-xl font-bold text-muted-foreground">3</Button>
                  <Button variant="outline" className="h-12 w-12 rounded-xl border-2 p-0"><ChevronDown className="-rotate-90 w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


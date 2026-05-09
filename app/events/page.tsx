"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Ticket, Calendar, Music, MapPin, Search, Filter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { events } from "@/lib/mock-data"

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full glassmorphism border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1.5 rounded-lg">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">ClubSpot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/clubs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Clubs</Link>
            <Link href="/events" className="text-sm font-medium text-primary">Events</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>
          <Button size="sm" className="rounded-full">Sign In</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
               <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight">Upcoming <span className="text-gradient">Events</span></h1>
                  <p className="text-muted-foreground text-lg max-w-xl">Discover the most exclusive parties, live performances, and DJ sets in your city.</p>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input placeholder="Search events..." className="pl-10 rounded-xl h-12" />
                  </div>
                  <Button variant="outline" className="h-12 rounded-xl px-6">
                     <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
               </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {events.map((event, i) => (
                 <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                 >
                    <Card className="rounded-[2rem] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
                       <div className="aspect-video relative overflow-hidden">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-4 left-4">
                             <Badge className="bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-lg">{event.tag}</Badge>
                          </div>
                       </div>
                       <CardContent className="p-8 space-y-6">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em]">
                                <Calendar className="h-3 w-3" />
                                {event.date} • {event.time}
                             </div>
                             <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{event.title}</h3>
                             <div className="flex items-center gap-1.5 text-muted-foreground font-medium text-sm">
                                <MapPin className="h-3.5 w-3.5" />
                                {event.clubName}
                             </div>
                          </div>
                          <Button asChild className="w-full rounded-xl group" variant="secondary">
                             <Link href={`/clubs/${event.clubId}`}>
                                Book Now
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                             </Link>
                          </Button>
                       </CardContent>
                    </Card>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section className="py-24">
           <div className="container px-4 md:px-6">
              <div className="rounded-[3rem] bg-gradient-to-br from-primary to-purple-600 p-12 md:p-20 text-primary-foreground relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-1/4" />
                 <div className="max-w-2xl space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">Host your own event with ClubSpot</h2>
                    <p className="text-primary-foreground/80 text-xl font-medium">Planning a private party, corporate event, or a large celebration? Our concierge team will handle everything from venue selection to transport.</p>
                    <Button size="xl" className="bg-white text-primary hover:bg-white/90 rounded-2xl font-black px-10">Inquire Now</Button>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-12 border-t">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-sm text-muted-foreground">© 2026 ClubSpot. Elevating your nightlife experience.</p>
           <div className="flex gap-8 text-sm font-bold text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}

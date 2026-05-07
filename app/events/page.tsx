import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, Ticket, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = { title: "Events — Upcoming Nightlife Events Near You" }

const events = [
  { id:"e1", name:"Friday Night Live", club:"Skyline Lounge", date:"May 17, 2025", time:"10:00 PM - 4:00 AM", location:"Downtown, New York", image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop", genre:"House Music", price:"$25", hot:true },
  { id:"e2", name:"Saturday Sunset Sessions", club:"Pulse Nightclub", date:"May 18, 2025", time:"6:00 PM - 10:00 PM", location:"Miami Beach, FL", image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop", genre:"Chill Beats", price:"$15", hot:false },
  { id:"e3", name:"Industry Night", club:"Echo Club", date:"May 21, 2025", time:"9:00 PM - 2:00 AM", location:"Los Angeles, CA", image:"https://images.unsplash.com/photo-1571935441006-8e1a3db40c06?w=600&h=400&fit=crop", genre:"Hip-Hop", price:"Free", hot:true },
  { id:"e4", name:"VIP Gala Night", club:"Velvet Underground", date:"May 24, 2025", time:"8:00 PM - 3:00 AM", location:"Chicago, IL", image:"https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&h=400&fit=crop", genre:"Electronic", price:"$50", hot:false },
  { id:"e5", name:"Rooftop Rave", club:"Azure", date:"May 25, 2025", time:"7:00 PM - 1:00 AM", location:"San Francisco, CA", image:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop", genre:"Tech House", price:"$30", hot:true },
  { id:"e6", name:"Latin Fever Night", club:"Mirage", date:"May 31, 2025", time:"10:00 PM - 4:00 AM", location:"Las Vegas, NV", image:"https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&h=400&fit=crop", genre:"Latin", price:"$20", hot:false },
]

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="container text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <TrendingUp className="w-3 h-3" /> Upcoming Events
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Find Your Perfect Night Out</h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Browse upcoming events at the hottest clubs near you. Buy tickets in seconds.</p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => (
              <Card key={ev.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={ev.image} alt={ev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {ev.hot && <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500">🔥 Hot</Badge>}
                  <Badge variant="secondary" className="absolute top-3 right-3">{ev.genre}</Badge>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm">{ev.club}</p>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{ev.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />{ev.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />{ev.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />{ev.location}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="font-bold text-primary">{ev.price}</span>
                  <Button size="sm"><Ticket className="mr-2 h-4 w-4" />Get Tickets</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

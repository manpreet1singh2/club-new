"use client"

import { events } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Ticket, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EventsDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Events for You</h1>
          <p className="text-muted-foreground font-medium">Curated nightlife experiences based on your preferences.</p>
        </div>
        <Button className="rounded-xl h-12 font-bold shadow-lg shadow-primary/20">
           <Ticket className="mr-2 h-4 w-4" /> Discover More
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="rounded-[2.5rem] border-none shadow-xl overflow-hidden group">
             <CardContent className="p-0">
                <div className="flex flex-col">
                   <div className="h-48 bg-muted relative overflow-hidden">
                      <img src={event.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-6 left-6">
                         <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-lg">
                            {event.tag}
                         </Badge>
                      </div>
                   </div>
                   <div className="p-8 space-y-6">
                      <div className="space-y-2">
                         <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.2em]">
                            <Calendar className="h-3 w-3" />
                            {event.date} • {event.time}
                         </div>
                         <h3 className="text-2xl font-black tracking-tight">{event.title}</h3>
                         <div className="flex items-center gap-1.5 text-muted-foreground font-medium text-sm">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.clubName}
                         </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-muted/50">
                         <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Limited Spots</span>
                         </div>
                         <Button asChild variant="secondary" className="rounded-xl font-bold">
                            <Link href={`/clubs/${event.clubId}`}>
                               Get Tickets <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                         </Button>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

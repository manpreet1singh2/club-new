"use client"

import { allBookings, clubs } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">My Reservations</h1>
        <p className="text-muted-foreground font-medium">View and manage all your upcoming and past bookings.</p>
      </div>

      <div className="grid gap-6">
        {allBookings.map((booking) => {
          const club = clubs.find(c => c.id === booking.clubId)
          return (
            <Card key={booking.id} className="rounded-3xl border-none shadow-xl overflow-hidden group">
               <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                     <div className="md:w-1/4 aspect-video md:aspect-auto bg-muted relative overflow-hidden">
                        <img src={club?.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 left-4">
                           <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'} className="font-black uppercase tracking-widest text-[10px] px-3 py-1">
                              {booking.status}
                           </Badge>
                        </div>
                     </div>
                     <div className="flex-1 p-8 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                           <div className="space-y-2">
                              <h3 className="text-2xl font-black tracking-tight">{club?.name}</h3>
                              <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                                 <MapPin className="h-4 w-4 text-primary" />
                                 {club?.location}
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reservation ID</p>
                              <p className="text-lg font-black tracking-widest text-primary">#{booking.bookingId}</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</p>
                              <div className="flex items-center gap-2 font-bold">
                                 <Calendar className="h-4 w-4 text-primary" />
                                 {booking.date}
                              </div>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Time</p>
                              <div className="flex items-center gap-2 font-bold">
                                 <Clock className="h-4 w-4 text-primary" />
                                 {booking.time}
                              </div>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Guests</p>
                              <div className="font-black text-xl">{booking.numPeople}</div>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Package</p>
                              <Badge variant="outline" className="font-bold">{booking.packageId}</Badge>
                           </div>
                        </div>
                     </div>
                     <div className="md:w-1/6 border-l flex flex-col items-center justify-center p-8 bg-muted/5 gap-4">
                        <div className="text-center">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Paid Advance</p>
                           <p className="text-2xl font-black">${booking.paidAmount}</p>
                        </div>
                        <Button variant="outline" className="w-full rounded-xl font-bold">View Ticket</Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

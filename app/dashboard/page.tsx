"use client"

import { Calendar, CreditCard, DollarSign, MessageSquare, Star, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allBookings, events, clubs } from "@/lib/mock-data"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground font-medium">Welcome back, John! Here's an overview of your activity.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="rounded-xl font-bold">
            <Link href="/clubs">
              <Calendar className="mr-2 h-4 w-4" />
              Book a Club
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl font-bold border-2">
            <Link href="/events">
              <Ticket className="mr-2 h-4 w-4" />
              Upcoming Events
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">{allBookings.filter(b => b.userId === "John Doe").length}</div>
            <p className="text-xs text-muted-foreground font-medium">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Nearby Events</CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">{events.length}</div>
            <p className="text-xs text-muted-foreground font-medium">Next event in 2 days</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">5</div>
            <p className="text-xs text-muted-foreground font-medium">3 new since yesterday</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">$1,234</div>
            <p className="text-xs text-muted-foreground font-medium">+$340 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl h-12">
          <TabsTrigger value="upcoming" className="rounded-lg px-8 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="rounded-lg px-8 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-black tracking-tight">Active Reservations</CardTitle>
              <CardDescription className="font-medium">Managing your upcoming nightclub experiences.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest">Venue</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">Date</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">Time</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">Guests</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="px-8 text-right font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allBookings.filter(b => b.userId === "John Doe").map((booking) => {
                    const club = clubs.find(c => c.id === booking.clubId)
                    return (
                      <TableRow key={booking.id} className="hover:bg-muted/20 transition-colors">
                        <TableCell className="px-8 py-5 font-bold">{club?.name}</TableCell>
                        <TableCell className="font-medium">{booking.date}</TableCell>
                        <TableCell className="font-medium">{booking.time}</TableCell>
                        <TableCell className="font-black">{booking.numPeople}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'border-green-500 bg-green-50 text-green-500' : 'border-yellow-500 bg-yellow-50 text-yellow-500'}`}>
                            {booking.status}
                          </div>
                        </TableCell>
                        <TableCell className="px-8 text-right">
                          <Button variant="ghost" size="sm" asChild className="rounded-lg font-bold">
                            <Link href={`/dashboard/bookings`}>View Ticket</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-8 pt-4">
              <Button variant="outline" className="w-full rounded-xl font-bold border-2" asChild>
                <Link href="/dashboard/bookings">Explore All Bookings</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <Card className="rounded-[2rem] border-none shadow-xl flex items-center justify-center p-20 text-center">
             <div className="space-y-4">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                   <Star className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No past bookings found</h3>
                <p className="text-muted-foreground">Your history will appear here once you complete an event.</p>
             </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-[2rem] border-none shadow-xl overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-black tracking-tight">Recommended Events</CardTitle>
            <CardDescription className="font-medium">Hand-picked experiences just for you.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex gap-6 items-center group">
                  <div className="h-24 w-32 rounded-2xl overflow-hidden shadow-lg shrink-0">
                    <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground font-bold">{event.clubName}</p>
                    <div className="flex items-center text-xs font-black uppercase tracking-widest text-primary pt-1">
                      <Calendar className="mr-1.5 h-3.5 w-3.5" />
                      {event.date} • {event.time}
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="rounded-xl font-bold border-2 hidden sm:flex">
                    <Link href="/events">Get Access</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-8 py-6 bg-muted/20">
            <Button variant="link" className="w-full font-black uppercase tracking-widest text-xs" asChild>
              <Link href="/dashboard/events">View Discovery Feed</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3 rounded-[2rem] border-none shadow-xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-black tracking-tight">Recent Activity</CardTitle>
            <CardDescription className="font-medium">Track your platform engagements.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
              {[
                { icon: Calendar, text: "Table booked at Skyline Lounge", time: "May 12, 3:45 PM" },
                { icon: Ticket, text: "Tickets for Neon Nights Festival", time: "May 10, 7:30 PM" },
                { icon: Star, text: "Review left for Pulse Nightclub", time: "May 8, 11:20 AM" },
                { icon: CreditCard, text: "Payment method updated", time: "May 5, 2:15 PM" }
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-6 relative z-10">
                  <div className="rounded-xl bg-background border-2 border-muted p-2 shadow-sm">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">{activity.text}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

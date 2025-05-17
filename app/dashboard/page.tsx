import { Calendar, CreditCard, DollarSign, MessageSquare, Star, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your activity.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Book a Club
          </Button>
          <Button variant="outline">
            <Ticket className="mr-2 h-4 w-4" />
            Plan an Event
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next event in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 new since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">+$340 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>You have 3 upcoming bookings in the next 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Club</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Skyline Lounge</TableCell>
                    <TableCell>May 18, 2024</TableCell>
                    <TableCell>9:00 PM</TableCell>
                    <TableCell>4 people</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full border border-green-500 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                        Confirmed
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pulse Nightclub</TableCell>
                    <TableCell>May 24, 2024</TableCell>
                    <TableCell>10:30 PM</TableCell>
                    <TableCell>6 people</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full border border-yellow-500 bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-500">
                        Pending
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Echo Club</TableCell>
                    <TableCell>June 2, 2024</TableCell>
                    <TableCell>8:00 PM</TableCell>
                    <TableCell>2 people</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full border border-green-500 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                        Confirmed
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Bookings</CardTitle>
              <CardDescription>Your booking history from the past 3 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Club</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Velvet Underground</TableCell>
                    <TableCell>April 28, 2024</TableCell>
                    <TableCell>10:00 PM</TableCell>
                    <TableCell>8 people</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full border border-green-500 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                        Completed
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mirage</TableCell>
                    <TableCell>April 15, 2024</TableCell>
                    <TableCell>9:30 PM</TableCell>
                    <TableCell>4 people</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full border border-green-500 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                        Completed
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Azure</TableCell>
                    <TableCell>March 30, 2024</TableCell>
                    <TableCell>8:00 PM</TableCell>
                    <TableCell>2 people</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center rounded-full border border-red-500 bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-500">
                        Cancelled
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you might be interested in.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "e1",
                  name: "Friday Night Live",
                  club: "Skyline Lounge",
                  date: "May 17, 2024",
                  time: "10:00 PM - 4:00 AM",
                  description: "Join us for a night of house music with DJ Max Power.",
                  image: "/placeholder.svg?height=100&width=200",
                },
                {
                  id: "e2",
                  name: "Saturday Sunset Sessions",
                  club: "Pulse Nightclub",
                  date: "May 18, 2024",
                  time: "6:00 PM - 10:00 PM",
                  description: "Enjoy sunset views with chill beats and signature cocktails.",
                  image: "/placeholder.svg?height=100&width=200",
                },
                {
                  id: "e3",
                  name: "Industry Night",
                  club: "Echo Club",
                  date: "May 21, 2024",
                  time: "9:00 PM - 2:00 AM",
                  description: "Special discounts for hospitality workers with valid ID.",
                  image: "/placeholder.svg?height=100&width=200",
                },
              ].map((event) => (
                <div key={event.id} className="flex gap-4">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.club}</p>
                    <div className="mt-1 flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {event.date} • {event.time}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 self-center">
                    Get Tickets
                  </Button>
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
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent activity on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">You booked a table at Skyline Lounge</p>
                  <p className="text-sm text-muted-foreground">May 12, 2024 at 3:45 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Ticket className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">You purchased tickets for Friday Night Live</p>
                  <p className="text-sm text-muted-foreground">May 10, 2024 at 7:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">You left a review for Pulse Nightclub</p>
                  <p className="text-sm text-muted-foreground">May 8, 2024 at 11:20 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">You added a new payment method</p>
                  <p className="text-sm text-muted-foreground">May 5, 2024 at 2:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

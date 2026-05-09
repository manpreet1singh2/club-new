"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  Zap,
  ChevronRight,
  Bell,
  CheckCircle2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { convertToCSV, downloadCSV } from "@/lib/excel-utils"
import type { Booking, TransportType, BookingStatus, PaymentStatus } from "@/lib/types"
import { clubs } from "@/lib/mock-data"

export default function OwnerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mocking more bookings for the dashboard
  const bookings: Booking[] = [
    {
      id: "1",
      bookingId: "BK-1234",
      userId: "John Doe",
      clubId: "1",
      packageId: "Full Combo",
      date: "2026-05-18",
      time: "10:00 PM",
      numPeople: 4,
      transportType: "cab" as TransportType,
      status: "confirmed" as BookingStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 200,
      paidAmount: 30,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      bookingId: "BK-5678",
      userId: "Alice Smith",
      clubId: "1",
      packageId: "Entry Only",
      date: "2026-05-18",
      time: "9:30 PM",
      numPeople: 2,
      transportType: "none" as TransportType,
      status: "pending" as BookingStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 50,
      paidAmount: 7.5,
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      bookingId: "BK-9012",
      userId: "Mike Ross",
      clubId: "1",
      packageId: "Entry + Drinks",
      date: "2026-05-19",
      time: "11:00 PM",
      numPeople: 5,
      transportType: "cab" as TransportType,
      status: "confirmed" as BookingStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 150,
      paidAmount: 22.5,
      createdAt: new Date().toISOString(),
    },
  ]

  const filteredBookings = bookings.filter(b =>
    b.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportToCSV = () => {
    const csvData = convertToCSV(bookings)
    downloadCSV(csvData, `bookings_export_${new Date().toLocaleDateString()}.csv`)
  }

  const stats = [
    { label: "Today's Bookings", value: "8", change: "+12%", icon: Ticket, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Expected Guests", value: "32", change: "+5%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Revenue Share", value: "$1,240", change: "+18%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  ]

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight">Club Management</h2>
          <p className="text-muted-foreground font-medium">Real-time overview of your club's performance and bookings.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl border-2 h-12 font-bold px-6" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button className="rounded-2xl h-12 font-bold px-6 shadow-xl shadow-primary/20">
            <Zap className="mr-2 h-4 w-4 fill-current" />
            Quick Action
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-3xl border-none shadow-xl shadow-black/5 overflow-hidden group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:scale-110`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="success" className="rounded-lg">{stat.change}</Badge>
                </div>
                <div className="mt-6 space-y-1">
                   <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                   <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
        <CardHeader className="p-8 md:p-10 border-b bg-muted/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black tracking-tight">Recent Reservations</CardTitle>
              <CardDescription className="font-medium text-base">You have {bookings.length} reservations today.</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reservations..."
                  className="pl-10 h-12 rounded-xl border-2 focus:border-primary w-full md:w-64 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 w-12 rounded-xl border-2 p-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Guest</TableHead>
                  <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Schedule</TableHead>
                  <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Group</TableHead>
                  <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Experience</TableHead>
                  <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Transport</TableHead>
                  <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="px-8 py-5 text-right font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="group hover:bg-muted/20 transition-colors">
                    <TableCell className="px-8 py-6 font-bold">
                       <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                             {booking.userId.charAt(0)}
                          </div>
                          <div className="space-y-0.5">
                             <div className="text-base">{booking.userId}</div>
                             <div className="text-[10px] text-muted-foreground tracking-tighter uppercase font-black">ID: #{booking.bookingId}</div>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                       <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                             <Calendar className="h-3 w-3 text-primary" />
                             {booking.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                             <Clock className="h-3 w-3" />
                             {booking.time}
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-6 font-black text-lg">{booking.numPeople}</TableCell>
                    <TableCell className="py-6">
                       <Badge variant="outline" className="rounded-lg border-2 font-bold px-3 py-1">
                          {booking.packageId}
                       </Badge>
                    </TableCell>
                    <TableCell className="py-6">
                       <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${booking.transportType !== 'none' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                             <Zap className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold capitalize">{booking.transportType}</span>
                       </div>
                    </TableCell>
                    <TableCell className="py-6">
                      <Badge variant={booking.status === "confirmed" ? "success" : "warning"} className="rounded-xl px-4 py-1 font-black text-[10px] uppercase tracking-widest">
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary p-0">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-2 p-2 min-w-[180px]">
                          <DropdownMenuLabel className="px-4 py-2 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Manage Reservation</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                            <ArrowUpRight className="h-4 w-4" /> View Full Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                            <CheckCircle2 className="h-4 w-4" /> Confirm Arrival
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 text-destructive focus:bg-destructive/5 cursor-pointer">
                            <LogOut className="h-4 w-4" /> Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

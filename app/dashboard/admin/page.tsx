"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Building2,
  Plus,
  Users,
  Truck,
  TrendingUp,
  Star,
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Settings
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { clubs } from "@/lib/mock-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+20.1%", icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Active Clubs", value: "12", change: "+2", icon: Building2, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Active Drivers", value: "24", change: "Stable", icon: Truck, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Total Users", value: "2,350", change: "+180", icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
  ]

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight">System Control</h2>
          <p className="text-muted-foreground font-medium">Enterprise-wide management and performance analytics.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl border-2 h-12 font-bold px-6">
            <Globe className="mr-2 h-4 w-4" />
            Global Logs
          </Button>
          <Button className="rounded-2xl h-12 font-bold px-6 shadow-xl shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Add New Club
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <Badge variant="secondary" className="rounded-lg">{stat.change}</Badge>
                </div>
                <div className="mt-6 space-y-1">
                   <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                   <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="clubs" className="space-y-8">
        <div className="flex justify-between items-center bg-muted/30 p-1.5 rounded-2xl border w-fit">
            <TabsList className="bg-transparent h-12 p-0 gap-2">
              {["clubs", "drivers", "analytics", "settings"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-xl px-8 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm font-bold transition-all capitalize"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
        </div>

        <TabsContent value="clubs" className="mt-0 focus-visible:outline-none">
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <CardHeader className="p-8 md:p-10 border-b bg-muted/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black tracking-tight">Active Venues</CardTitle>
                        <CardDescription className="font-medium text-base">Managing 12 registered nightclub properties.</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Filter venues..." className="pl-10 h-12 rounded-xl border-2 w-64 bg-background" />
                        </div>
                        <Button variant="outline" className="h-12 w-12 rounded-xl border-2 p-0">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Venue</TableHead>
                    <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Ownership</TableHead>
                    <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Performance</TableHead>
                    <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="px-8 py-5 text-right font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clubs.map((club) => (
                    <TableRow key={club.id} className="group hover:bg-muted/20 transition-colors">
                      <TableCell className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                               <Building2 className="h-6 w-6" />
                            </div>
                            <div className="space-y-0.5">
                               <div className="text-base font-black tracking-tight">{club.name}</div>
                               <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{club.location}</div>
                            </div>
                         </div>
                      </TableCell>
                      <TableCell className="py-6 font-bold">Manpreet S.</TableCell>
                      <TableCell className="py-6">
                         <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <span className="font-black text-lg">${(Math.random() * 10000 + 5000).toFixed(0)}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge variant="success" className="rounded-xl px-4 py-1 font-black text-[10px] uppercase tracking-widest">
                          active
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
                                <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                    <ArrowUpRight className="h-4 w-4" /> Manage Venue
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                                    <Zap className="h-4 w-4" /> View Analytics
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drivers" className="mt-0 focus-visible:outline-none">
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <CardHeader className="p-8 md:p-10 border-b bg-muted/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black tracking-tight">Active Drivers</CardTitle>
                        <CardDescription className="font-medium text-base">Managing 24 transport partners across all cities.</CardDescription>
                    </div>
                    <Button className="rounded-xl h-12 font-bold px-6">
                        <Plus className="mr-2 h-4 w-4" /> Add Driver
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Driver</TableHead>
                    <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Vehicle</TableHead>
                    <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Rating</TableHead>
                    <TableHead className="py-5 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                    <TableHead className="px-8 py-5 text-right font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "James Wilson", type: "Cab", plate: "NY-BK-1234", rating: 4.9, status: "available" },
                    { name: "Sarah Chen", type: "Bike", plate: "NY-BK-5678", rating: 4.8, status: "on-trip" },
                  ].map((driver) => (
                    <TableRow key={driver.name} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold">
                               {driver.name.charAt(0)}
                            </div>
                            <span className="font-bold">{driver.name}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6">
                         <div className="flex flex-col">
                            <span className="font-bold">{driver.type}</span>
                            <span className="text-xs text-muted-foreground">{driver.plate}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6">
                         <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="font-bold">{driver.rating}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge variant={driver.status === 'available' ? 'success' : 'warning'} className="rounded-xl px-3 py-0.5 font-black text-[9px] uppercase">
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-0 focus-visible:outline-none">
           <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-3xl border-none shadow-xl p-8">
                 <h3 className="text-xl font-bold mb-6">Booking Volume (7 Days)</h3>
                 <div className="h-64 w-full bg-muted/20 rounded-2xl flex items-end justify-between p-6 gap-2">
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary">
                           <div style={{ height: `${h}%` }} className="w-full bg-primary rounded-t-lg" />
                        </div>
                    ))}
                 </div>
              </Card>
              <Card className="rounded-3xl border-none shadow-xl p-8">
                 <h3 className="text-xl font-bold mb-6">Revenue by City</h3>
                 <div className="space-y-6">
                    {[
                      { city: "New York", val: 85, color: "bg-blue-500" },
                      { city: "Miami", val: 65, color: "bg-purple-500" },
                      { city: "Las Vegas", val: 95, color: "bg-emerald-500" },
                      { city: "Los Angeles", val: 55, color: "bg-orange-500" }
                    ].map(city => (
                      <div key={city.city} className="space-y-2">
                         <div className="flex justify-between text-sm font-bold">
                            <span>{city.city}</span>
                            <span>{city.val}%</span>
                         </div>
                         <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${city.color}`} style={{ width: `${city.val}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

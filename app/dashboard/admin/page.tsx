"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Building2,
  Plus,
  Users,
  Truck,
  TrendingUp,
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
                  {[
                    { name: "Skyline Lounge", loc: "New York", owner: "John D.", rev: "$12,450", status: "active" },
                    { name: "Pulse Nightclub", loc: "Miami", owner: "Sarah S.", rev: "$8,920", status: "active" },
                  ].map((club) => (
                    <TableRow key={club.name} className="group hover:bg-muted/20 transition-colors">
                      <TableCell className="px-8 py-6">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                               <Building2 className="h-6 w-6" />
                            </div>
                            <div className="space-y-0.5">
                               <div className="text-base font-black tracking-tight">{club.name}</div>
                               <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{club.loc}</div>
                            </div>
                         </div>
                      </TableCell>
                      <TableCell className="py-6 font-bold">{club.owner}</TableCell>
                      <TableCell className="py-6">
                         <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            <span className="font-black text-lg">{club.rev}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge variant="success" className="rounded-xl px-4 py-1 font-black text-[10px] uppercase tracking-widest">
                          {club.status}
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
        {/* Other Tabs content can be styled similarly */}
      </Tabs>
    </div>
  )
}

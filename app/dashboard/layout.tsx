"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Home,
  Calendar,
  Ticket,
  MessageSquare,
  Star,
  CreditCard,
  Settings,
  LogOut,
  LayoutDashboard,
  Zap,
  ChevronRight,
  Bell,
  Search,
  User,
  Menu
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  const menuItems = [
    { label: "Overview", icon: Home, path: "/dashboard" },
    { label: "Bookings", icon: Calendar, path: "/dashboard/bookings" },
    { label: "Events", icon: Ticket, path: "/dashboard/events" },
    { label: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
    { label: "Reviews", icon: Star, path: "/dashboard/reviews" },
    { label: "Payments", icon: CreditCard, path: "/dashboard/payments" },
  ]

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar className="border-r-2 border-muted/50">
          <SidebarHeader className="h-20 flex items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <div className="bg-primary p-1.5 rounded-lg text-primary-foreground shadow-lg shadow-primary/20">
                <Ticket className="h-5 w-5" />
              </div>
              <span className="text-gradient">ClubSpot</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4 py-6">
            <div className="mb-8 px-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Main Menu</p>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path)}
                        className={`h-12 rounded-xl px-4 transition-all duration-300 ${isActive(item.path) ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground font-medium"}`}
                      >
                        <Link href={item.path} className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          <span>{item.label}</span>
                          {isActive(item.path) && (
                              <motion.div layoutId="active" className="ml-auto">
                                <ChevronRight className="h-4 w-4 opacity-50" />
                              </motion.div>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
            </div>

            <div className="px-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Administration</p>
                <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive("/dashboard/owner")}
                        className={`h-12 rounded-xl px-4 transition-all ${isActive("/dashboard/owner") ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground font-medium"}`}
                      >
                        <Link href="/dashboard/owner" className="flex items-center gap-3">
                          <Zap className="h-5 w-5" />
                          <span>Club Owner</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive("/dashboard/admin")}
                        className={`h-12 rounded-xl px-4 transition-all ${isActive("/dashboard/admin") ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground font-medium"}`}
                      >
                        <Link href="/dashboard/admin" className="flex items-center gap-3">
                          <LayoutDashboard className="h-5 w-5" />
                          <span>Super Admin</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t-2 border-muted/50">
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-12 rounded-xl px-4 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all">
                    <LogOut className="h-5 w-5" />
                    <span className="font-bold">Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 flex items-center justify-between px-8 glassmorphism sticky top-0 z-40 border-b-2 border-muted/50">
            <div className="flex items-center gap-4 flex-1">
                <SidebarTrigger className="hover:bg-muted rounded-xl" />
                <div className="hidden md:flex items-center relative w-96 group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                   <Input placeholder="Global search..." className="pl-10 h-11 rounded-xl border-2 bg-muted/20 border-transparent focus:border-primary/20 focus:bg-background transition-all" />
                </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-muted">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-background" />
              </Button>
              <div className="h-8 w-[2px] bg-muted mx-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-11 gap-3 px-2 rounded-xl hover:bg-muted">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black">J</div>
                    <div className="hidden lg:block text-left">
                        <p className="text-xs font-black leading-none">John Doe</p>
                        <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">Premium Member</p>
                    </div>
                    <ChevronRight className="h-3 w-3 rotate-90 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl border-2 p-2 mt-2">
                  <DropdownMenuLabel className="px-4 py-2 font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground">My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer"><User className="h-4 w-4" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 focus:bg-primary/5 focus:text-primary cursor-pointer"><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem className="rounded-xl px-4 py-3 font-bold gap-3 text-destructive focus:bg-destructive/5 cursor-pointer"><LogOut className="h-4 w-4" /> Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="p-8 md:p-12 overflow-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

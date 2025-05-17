"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
  Ticket,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        {/* Mobile Sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex h-16 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <Ticket className="h-6 w-6 text-primary" />
                <span>ClubSpot</span>
              </Link>
            </div>
            <nav className="grid gap-2 p-4">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/bookings"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/bookings") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <Calendar className="h-5 w-5" />
                Bookings
              </Link>
              <Link
                href="/dashboard/events"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/events") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <Ticket className="h-5 w-5" />
                Events
              </Link>
              <Link
                href="/dashboard/messages"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/messages") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <MessageSquare className="h-5 w-5" />
                Messages
              </Link>
              <Link
                href="/dashboard/reviews"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/reviews") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <Star className="h-5 w-5" />
                Reviews
              </Link>
              <Link
                href="/dashboard/payments"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/payments") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <CreditCard className="h-5 w-5" />
                Payments
              </Link>
              <Link
                href="/dashboard/settings"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/settings") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex">
          <SidebarHeader className="border-b px-6 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Ticket className="h-6 w-6 text-primary" />
              <span>ClubSpot</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4 py-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/bookings")}>
                  <Link href="/dashboard/bookings">
                    <Calendar className="h-5 w-5" />
                    <span>Bookings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/events")}>
                  <Link href="/dashboard/events">
                    <Ticket className="h-5 w-5" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/messages")}>
                  <Link href="/dashboard/messages">
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/reviews")}>
                  <Link href="/dashboard/reviews">
                    <Star className="h-5 w-5" />
                    <span>Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/payments")}>
                  <Link href="/dashboard/payments">
                    <CreditCard className="h-5 w-5" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                  <Link href="/dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/logout">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="hidden md:flex" />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline-flex">John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, Download, Home, MapPin, QrCode, Share2, Ticket, Zap, ShieldCheck, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: bookingId } = use(params)

  if (!bookingId) return (
    <div className="flex items-center justify-center min-h-screen">
      <Zap className="h-10 w-10 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full glassmorphism border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1.5 rounded-lg">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">ClubSpot</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="rounded-full font-bold">
              My Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl py-12 md:py-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center space-y-6 mb-12"
        >
          <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shadow-inner">
            <CheckCircle2 className="h-14 w-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                Check your WhatsApp for the digital ticket and transport details.
            </p>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Card className="overflow-hidden border-none shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem]">
              <div className="bg-primary p-8 md:p-12 text-primary-foreground flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative z-10 space-y-1">
                  <p className="text-primary-foreground/60 text-xs font-black uppercase tracking-widest">Reservation ID</p>
                  <h2 className="text-3xl md:text-4xl font-black tracking-widest">#{bookingId}</h2>
                </div>
                <Ticket className="h-16 w-16 text-white/20 rotate-12 relative z-10" />
              </div>
              <CardContent className="p-8 md:p-12 space-y-10">
                <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Date</p>
                    <p className="text-xl font-black">May 18, 2024</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Arrival Time</p>
                    <p className="text-xl font-black text-primary">10:00 PM</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Primary Guest</p>
                    <p className="text-xl font-black">John Doe</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Party Size</p>
                    <p className="text-xl font-black">4 People</p>
                  </div>
                </div>

                <Separator className="bg-muted/50" />

                <div className="space-y-3">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Selected Experience</p>
                  <div className="flex items-center justify-between bg-muted/30 p-4 rounded-2xl border">
                    <span className="font-black text-lg">Full Combo (VIP)</span>
                    <Badge variant="success" className="px-3 py-1">Paid Advance</Badge>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-3xl flex items-start gap-4 border border-primary/10">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-black tracking-tight">Pickup Scheduled</p>
                    <p className="text-sm text-muted-foreground font-medium">9:15 PM • Sector 17, Chandigarh</p>
                    <div className="flex items-center gap-1.5 pt-1">
                        <Zap className="h-3.5 w-3.5 text-primary fill-current" />
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">Driver info via WhatsApp (T-60 min)</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center pt-4 space-y-6">
                  <div className="p-8 bg-white rounded-[2rem] border-2 border-muted shadow-xl relative group">
                    <QrCode className="h-40 w-40 text-black transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-black uppercase tracking-widest">Entry QR Code</p>
                    <p className="text-xs text-muted-foreground font-medium">Present this code at the venue entrance</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-8 md:p-12 flex flex-col sm:flex-row gap-4 border-t border-muted/50">
                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-black text-sm uppercase tracking-widest hover:bg-background transition-all">
                  <Download className="mr-2 h-4 w-4" />
                  Save Ticket
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-black text-sm uppercase tracking-widest hover:bg-background transition-all">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Details
                </Button>
              </CardFooter>
            </Card>
        </motion.div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button asChild variant="ghost" className="flex-1 h-14 rounded-2xl font-black text-sm uppercase tracking-widest text-muted-foreground hover:text-primary">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild className="flex-1 h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20">
            <Link href="/dashboard">
              Manage Bookings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

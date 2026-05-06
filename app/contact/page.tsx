"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Ticket, Mail, Phone, MapPin, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full glassmorphism border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1.5 rounded-lg">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-gradient">ClubSpot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/clubs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Clubs</Link>
            <Link href="/events" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Events</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-primary">Contact</Link>
          </nav>
          <Button size="sm" variant="outline" className="rounded-full">Support</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-20">
               <div className="space-y-12">
                  <div className="space-y-4">
                     <h1 className="text-5xl md:text-7xl font-black tracking-tight">Get in <span className="text-gradient">Touch</span></h1>
                     <p className="text-xl text-muted-foreground max-w-md leading-relaxed">Have questions about our platform or want to partner with us? We're here to help.</p>
                  </div>

                  <div className="space-y-8">
                     {[
                        { icon: Mail, title: "Email Us", value: "hello@clubspot.com", desc: "For general inquiries" },
                        { icon: MessageSquare, title: "Support Chat", value: "Available 24/7", desc: "Inside the dashboard" },
                        { icon: MapPin, title: "Headquarters", value: "Chandigarh, India", desc: "Sector 17, IT Park" }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-6 group">
                           <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                              <item.icon className="h-6 w-6" />
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                              <p className="text-xl font-bold">{item.value}</p>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-muted/30 border-2 border-dashed border-muted-foreground/20">
                     <div className="flex gap-4 items-center">
                        <div className="h-10 w-10 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                           <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="font-bold">Average Response Time</p>
                           <p className="text-sm text-muted-foreground">Under 2 hours during business hours.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div>
                  <Card className="rounded-[3rem] shadow-2xl border-none overflow-hidden">
                     <CardContent className="p-8 md:p-12 space-y-8">
                        <div className="space-y-2">
                           <h2 className="text-3xl font-black tracking-tight">Send a Message</h2>
                           <p className="text-muted-foreground font-medium">Fill out the form below and we'll get back to you shortly.</p>
                        </div>
                        <form className="space-y-6">
                           <div className="grid sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                                 <Input placeholder="John Doe" className="h-14 rounded-2xl border-2 font-medium" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                                 <Input placeholder="john@example.com" type="email" className="h-14 rounded-2xl border-2 font-medium" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</Label>
                              <Input placeholder="How can we help?" className="h-14 rounded-2xl border-2 font-medium" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Message</Label>
                              <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px] rounded-2xl border-2 font-medium p-4" />
                           </div>
                           <Button size="xl" className="w-full rounded-2xl group shadow-xl shadow-primary/20 h-16 text-lg">
                              Send Message
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                           </Button>
                        </form>
                     </CardContent>
                  </Card>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t text-center">
         <p className="text-sm text-muted-foreground">Crafted for the future of nightlife.</p>
      </footer>
    </div>
  )
}

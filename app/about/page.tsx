"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Ticket, Users, ShieldCheck, Zap, Globe, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const team = [
    { name: "Manpreet Singh", role: "Founder & CEO", image: "/placeholder-user.jpg" },
    { name: "Sarah Johnson", role: "Head of Operations", image: "/placeholder-user.jpg" },
    { name: "David Chen", role: "Lead Architect", image: "/placeholder-user.jpg" },
  ]

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
            <Link href="/about" className="text-sm font-medium text-primary">About</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>
          <Button variant="outline" size="sm" className="rounded-full px-6">Join Us</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 md:py-32 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
           <div className="container px-4 md:px-6 text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                 <h1 className="text-5xl md:text-7xl font-black tracking-tight">Redefining the <span className="text-gradient">Nightlife Experience</span></h1>
                 <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                   We built ClubSpot to eliminate the friction between you and an unforgettable night out. Enterprise-grade automation meets premium hospitality.
                 </p>
              </motion.div>
           </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { icon: Zap, title: "Efficiency", desc: "Real-time booking and automated driver assignment in under 60 seconds." },
                 { icon: ShieldCheck, title: "Security", desc: "Mandatory 15% secure advance payment protecting both venues and guests." },
                 { icon: Globe, title: "Global Vision", desc: "Scaling to every major nightlife hub worldwide with a unified platform." }
               ].map((item, i) => (
                 <div key={i} className="space-y-4 p-8 rounded-[2rem] bg-background shadow-xl shadow-black/5 border-2 border-transparent hover:border-primary/20 transition-all group">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                       <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container px-4 md:px-6 space-y-16">
             <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Meet the <span className="text-gradient">Visionaries</span></h2>
                <p className="text-muted-foreground text-lg">The team behind the most advanced booking system in the industry.</p>
             </div>
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {team.map((member, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                     <div className="aspect-square rounded-[3rem] overflow-hidden bg-muted relative mb-6 shadow-2xl transition-transform duration-700 group-hover:scale-[0.98]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="text-center space-y-1">
                        <h4 className="text-2xl font-black tracking-tight">{member.name}</h4>
                        <p className="text-primary font-black uppercase text-xs tracking-widest">{member.role}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
             <div className="space-y-6 max-w-xl">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">Ready to transform your venue?</h2>
                <p className="text-primary-foreground/80 text-lg font-medium">Join 500+ premium clubs worldwide and automate your entire booking flow.</p>
                <div className="flex gap-4">
                   <Button size="xl" className="bg-white text-black hover:bg-white/90 rounded-2xl">Get Started</Button>
                   <Button size="xl" variant="outline" className="border-2 border-white/20 hover:bg-white/10 rounded-2xl">Book a Demo</Button>
                </div>
             </div>
             <div className="h-64 w-64 bg-white/5 rounded-[3rem] rotate-12 flex items-center justify-center border-2 border-white/10 backdrop-blur-xl">
                <Ticket className="h-32 w-32 text-white/20" />
             </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t text-center">
         <p className="text-sm text-muted-foreground font-medium italic">"Nightlife is an art, booking should be a science."</p>
      </footer>
    </div>
  )
}

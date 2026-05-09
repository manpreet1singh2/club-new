"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, MapPin, Search, Star, Ticket, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { clubs } from "@/lib/mock-data"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

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
            {["Clubs", "Events", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center justify-center space-y-10 text-center"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  <span>The future of nightlife is here</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
                  Experience the <span className="text-gradient">Ultimate Nightlife</span> Simplified
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Discover top-rated clubs, reserve premium tables, and organize events with zero manual effort.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="w-full max-w-2xl space-y-6">
                <div className="relative group max-w-lg mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder="Search clubs, events, or locations..."
                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border-2 border-muted focus-visible:ring-primary focus-visible:border-primary shadow-xl shadow-black/5"
                  />
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { icon: MapPin, label: "Near Me" },
                    { icon: TrendingUp, label: "Trending" },
                    { icon: CalendarDays, label: "This Weekend" }
                  ].map((btn) => (
                    <Button key={btn.label} variant="secondary" size="sm" className="rounded-full px-5 py-5 hover:bg-primary hover:text-primary-foreground transition-all">
                      <btn.icon className="mr-2 h-4 w-4" />
                      {btn.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Explore Top Venues</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
                Hand-picked destinations for an unforgettable night out.
              </p>
            </div>
            <Tabs defaultValue="featured" className="w-full max-w-6xl mx-auto">
              <div className="flex justify-center mb-10">
                <TabsList className="bg-background border h-12 p-1 rounded-xl">
                  {["featured", "trending", "new", "nearby"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-lg px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent value="featured" className="mt-0 focus-visible:outline-none">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {clubs.map((club, index) => (
                    <ClubCard key={club.id} club={{...club, distance: "2.5 miles away"}} index={index} />
                  ))}
                </div>
              </TabsContent>
              {/* Other tabs content can be mapped similarly */}
            </Tabs>
            <div className="flex justify-center mt-16">
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all group">
                <Link href="/clubs" className="flex items-center">
                  View All Clubs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 -z-10 translate-x-1/2" />
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
                <div className="space-y-6">
                  {[
                    { icon: Search, title: "Discover", desc: "Browse through our curated list of top clubs and venues in your area." },
                    { icon: CalendarDays, title: "Book", desc: "Reserve tables, buy tickets, or organize private events with real-time availability." },
                    { icon: Sparkles, title: "Enjoy", desc: "Get instant confirmation and enjoy your night out with zero manual work." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 p-8">
                  <div className="w-full h-full rounded-2xl bg-background border shadow-2xl overflow-hidden relative group">
                    <img
                      src="/placeholder.svg?height=600&width=600"
                      alt="Interface Preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <div className="text-white space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex gap-2">
                           <ShieldCheck className="h-5 w-5 text-green-400" />
                           <span className="text-sm font-medium">Verified Bookings</span>
                        </div>
                        <p className="text-sm text-white/80">Our platform ensures zero manual work and 100% transparency for your night out.</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-background border p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Fast Approval</p>
                    <p className="text-xs text-muted-foreground">Under 5 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight">
                <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                  <Ticket className="h-5 w-5" />
                </div>
                <span className="text-gradient">ClubSpot</span>
              </Link>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Making nightlife booking professional, automated, and scalable. Your one-stop platform for club entries, table reservations, and premium transport.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/clubs" className="hover:text-primary transition-colors">Clubs</Link></li>
                <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
                <li><Link href="/transport" className="hover:text-primary transition-colors">Transport</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h4 className="font-bold mb-6">Newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="rounded-xl h-10" />
                <Button size="sm" className="rounded-xl">Join</Button>
              </div>
            </div>
          </div>
          <Separator className="my-12" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ClubSpot. Designed for the ultimate nightlife.
            </p>
            <div className="flex gap-6 grayscale opacity-60 hover:opacity-100 transition-opacity duration-500">
               <img src="/placeholder-logo.png" alt="Partner 1" className="h-6" />
               <img src="/placeholder-logo.png" alt="Partner 2" className="h-6" />
               <img src="/placeholder-logo.png" alt="Partner 3" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ClubCard({ club, index }: { club: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/clubs/${club.id}`}>
        <Card className="group overflow-hidden rounded-3xl border-none bg-background shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full">
          <div className="aspect-[4/3] w-full overflow-hidden relative">
            <img
              src={club.image || "/placeholder.svg"}
              alt={club.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {club.rating}
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{club.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="mr-1 h-3.5 w-3.5 text-primary" />
                {club.location}
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-muted">
              <div className="text-xs font-medium text-muted-foreground">
                {club.distance}
              </div>
              <div className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                Fast Booking
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}


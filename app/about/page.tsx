import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Star, Users, MapPin, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = { title: "About ClubSpot — Our Story" }

const stats = [
  { value: "50K+", label: "Happy Users" },
  { value: "500+", label: "Partner Clubs" },
  { value: "100K+", label: "Bookings Made" },
  { value: "4.9★", label: "App Rating" },
]

const team = [
  { name: "Alex Chen", role: "CEO & Co-Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Sarah Williams", role: "CTO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "Head of Partnerships", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container text-center space-y-5 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold">We&rsquo;re Building the Future of Nightlife</h1>
            <p className="text-xl text-muted-foreground">ClubSpot was founded with one mission — make every night out effortless, memorable, and safe.</p>
            <Link href="/contact"><Button size="lg">Get In Touch</Button></Link>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-primary">{s.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="container py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-5">
            <h2 className="text-4xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">Founded in 2021, ClubSpot was born from the frustration of standing in long queues, overpaying at the door, and missing out on sold-out events. We set out to build a platform that connects nightlife lovers with the best venues — instantly.</p>
            <p className="text-muted-foreground leading-relaxed">Today, we partner with 500+ clubs across the country, helping thousands of people every week discover great nights out, book VIP tables, and attend exclusive events.</p>
            <ul className="space-y-3">
              {["Real-time table availability","Instant booking confirmation","Secure payment processing","Verified venue reviews"].map(v=>(
                <li key={v} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />{v}</li>
              ))}
            </ul>
          </div>
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop" alt="ClubSpot story" fill className="object-cover" />
          </div>
        </section>

        {/* Team */}
        <section className="bg-muted/30 py-24">
          <div className="container text-center space-y-12">
            <div><h2 className="text-4xl font-bold mb-3">Meet the Team</h2><p className="text-muted-foreground">The people behind ClubSpot</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {team.map(m=>(
                <Card key={m.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={m.image} alt={m.name} fill className="object-cover" />
                  </div>
                  <CardContent className="pt-4 text-center">
                    <p className="font-bold">{m.name}</p>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

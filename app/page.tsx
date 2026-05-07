import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, Search, Star, Ticket, TrendingUp, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const featuredClubs = [
  { id:"1", name:"Skyline Lounge",       rating:4.8, location:"Downtown, New York",      distance:"2.5 mi", genre:"Lounge & Rooftop", image:"https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=400&fit=crop" },
  { id:"2", name:"Pulse Nightclub",      rating:4.6, location:"Miami Beach, Florida",    distance:"3.2 mi", genre:"EDM & House",      image:"https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&h=400&fit=crop" },
  { id:"3", name:"Echo Club",            rating:4.7, location:"Los Angeles, California", distance:"1.8 mi", genre:"Hip-Hop & RnB",    image:"https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop" },
]
const trendingClubs = [
  { id:"4", name:"Velvet Underground",   rating:4.9, location:"Chicago, Illinois",       distance:"4.1 mi", genre:"Live Music",       image:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop" },
  { id:"5", name:"Mirage",              rating:4.5, location:"Las Vegas, Nevada",        distance:"2.7 mi", genre:"Electronic",       image:"https://images.unsplash.com/photo-1571935441006-8e1a3db40c06?w=600&h=400&fit=crop" },
  { id:"6", name:"Azure",              rating:4.7, location:"San Francisco, California", distance:"3.3 mi", genre:"Tech House",       image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" },
]
const newClubs = [
  { id:"7", name:"Elevate",             rating:4.4, location:"Austin, Texas",            distance:"2.2 mi", genre:"Latin Vibes",      image:"https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&h=400&fit=crop" },
  { id:"8", name:"Fusion",             rating:4.3, location:"Seattle, Washington",       distance:"1.5 mi", genre:"Multi-genre",      image:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop" },
  { id:"9", name:"Prism",              rating:4.6, location:"Denver, Colorado",          distance:"3.8 mi", genre:"Techno",           image:"https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop" },
]

function ClubCard({ club }: { club: typeof featuredClubs[0] }) {
  return (
    <Link href={`/clubs/${club.id}`}>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <Image src={club.image} alt={club.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-black/60 hover:bg-black/60 text-white text-[10px]">{club.genre}</Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-base">{club.name}</h3>
            <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400"/><span className="text-sm font-semibold">{club.rating}</span></div>
          </div>
          <p className="text-sm text-muted-foreground">{club.location}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-1.5"><MapPin className="mr-1 h-3 w-3"/>{club.distance} away</div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1600&h=900&fit=crop" alt="Nightclub" fill className="object-cover opacity-25" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          <div className="container relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
            <Badge variant="secondary" className="px-4 py-1 text-xs font-bold uppercase tracking-widest">
              🎉 500+ Partner Clubs Nationwide
            </Badge>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Find & Book the <span className="text-primary">Best Clubs</span> Near You
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Discover top-rated clubs, reserve VIP tables, and organize unforgettable events — all in one place.
            </p>
            <div className="w-full max-w-lg space-y-3">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search clubs or locations..." className="pl-10 h-12 text-base" />
                </div>
                <Button size="lg" className="h-12 px-6">Search</Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Near Me","Trending","This Weekend","VIP Tables","Live Music"].map(tag=>(
                  <Button key={tag} variant="outline" size="sm" className="rounded-full text-xs">{tag}</Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y bg-muted/40 py-8">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["500+","Partner Clubs"],["50K+","Happy Users"],["100K+","Bookings"],["4.9★","Avg Rating"]].map(([v,l])=>(
              <div key={l}><p className="text-2xl font-black text-primary">{v}</p><p className="text-xs text-muted-foreground mt-1">{l}</p></div>
            ))}
          </div>
        </section>

        {/* Clubs */}
        <section className="w-full py-20">
          <div className="container space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl">Explore Top Clubs</h2>
              <p className="text-muted-foreground">Find the perfect venue for your night out.</p>
            </div>
            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              <TabsContent value="featured" className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredClubs.map(c=><ClubCard key={c.id} club={c}/>)}
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {trendingClubs.map(c=><ClubCard key={c.id} club={c}/>)}
                </div>
              </TabsContent>
              <TabsContent value="new" className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {newClubs.map(c=><ClubCard key={c.id} club={c}/>)}
                </div>
              </TabsContent>
            </Tabs>
            <div className="text-center">
              <Link href="/clubs"><Button size="lg" variant="outline">View All Clubs →</Button></Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="w-full py-20 bg-muted/40 border-y">
          <div className="container space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">How ClubSpot Works</h2>
              <p className="text-muted-foreground">Book your perfect night in 3 simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon:Search, step:"01", title:"Discover", desc:"Browse our curated list of top clubs and venues in your area." },
                { icon:CalendarDays, step:"02", title:"Book", desc:"Reserve tables, buy tickets, or organize private events instantly." },
                { icon:Ticket, step:"03", title:"Enjoy", desc:"Get instant confirmation and enjoy your night out hassle-free." },
              ].map(s=>(
                <div key={s.step} className="flex flex-col items-center text-center space-y-3">
                  <div className="relative w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                    <s.icon className="h-8 w-8 text-primary-foreground"/>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-primary text-primary text-xs font-black flex items-center justify-center">{s.step}</span>
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="py-20 container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon:Shield, title:"Safe & Secure", desc:"All bookings are protected with 256-bit SSL encryption and fraud detection." },
              { icon:Zap, title:"Instant Confirmation", desc:"Receive your booking confirmation and digital ticket in seconds." },
              { icon:Star, title:"Verified Reviews", desc:"Every review comes from a verified booking — no fakes, ever." },
            ].map(t=>(
              <Card key={t.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <t.icon className="h-5 w-5 text-primary"/>
                  </div>
                  <h3 className="font-bold text-lg">{t.title}</h3>
                  <p className="text-muted-foreground text-sm">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center space-y-5">
            <h2 className="text-4xl font-black">Ready for Your Best Night Out?</h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">Join 50,000+ nightlife lovers who trust ClubSpot to plan unforgettable experiences.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/signup"><Button size="lg" variant="secondary" className="font-bold">Create Free Account</Button></Link>
              <Link href="/clubs"><Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold">Browse Clubs</Button></Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  )
}

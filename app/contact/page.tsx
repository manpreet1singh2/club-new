import { Metadata } from "next"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = { title: "Contact Us — ClubSpot Support" }

const info = [
  { icon: Mail,  title: "Email Us",      value: "support@clubspot.app",     sub: "We reply within 24 hours" },
  { icon: Phone, title: "Call Us",       value: "+1 (800) CLUB-SPOT",       sub: "Mon–Fri, 9am–6pm EST" },
  { icon: MapPin,title: "Our Office",    value: "123 Fifth Ave, New York",   sub: "NY 10001, USA" },
  { icon: Clock, title: "Support Hours", value: "Mon–Fri: 9am – 6pm EST",   sub: "Emergency: 24/7" },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background border-b text-center">
          <div className="container max-w-2xl space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
            <p className="text-muted-foreground text-lg">Have a question? We&rsquo;re here to help. Send us a message and we&rsquo;ll respond as soon as possible.</p>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-4">
              {info.map(i=>(
                <Card key={i.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-5 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <i.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{i.title}</p>
                      <p className="text-sm text-foreground mt-0.5">{i.value}</p>
                      <p className="text-xs text-muted-foreground">{i.sub}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader><CardTitle>Send a Message</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>First Name</Label><Input placeholder="John" /></div>
                    <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Doe" /></div>
                  </div>
                  <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@example.com" /></div>
                  <div className="space-y-2"><Label>Phone (optional)</Label><Input type="tel" placeholder="+1 (555) 000-0000" /></div>
                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Issue</SelectItem>
                        <SelectItem value="payment">Payment Problem</SelectItem>
                        <SelectItem value="partnership">Club Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Message</Label><Textarea placeholder="Describe your issue or question..." rows={5} /></div>
                  <Button className="w-full" size="lg">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

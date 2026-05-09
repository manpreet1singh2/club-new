"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ReviewsDashboardPage() {
  const reviews = [
    { id: 1, club: "Skyline Lounge", rating: 5, date: "2 weeks ago", comment: "Absolutely loved the atmosphere! The VIP transport was seamless." },
    { id: 2, club: "Echo Club", rating: 4, date: "1 month ago", comment: "Great music, but the entry line was a bit long. Once inside, it was perfect." },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">My Reviews</h1>
        <p className="text-muted-foreground font-medium">Manage the feedback you've shared with our partner venues.</p>
      </div>

      <div className="grid gap-6">
         {reviews.map(review => (
            <Card key={review.id} className="rounded-[2rem] border-none shadow-xl p-8 space-y-6">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                     <h3 className="text-xl font-black">{review.club}</h3>
                     <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                           {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "opacity-20"}`} />
                           ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-bold">{review.date}</span>
                     </div>
                  </div>
                  <Badge variant="outline" className="w-fit font-bold rounded-lg border-2">Verified Visit</Badge>
               </div>
               <p className="text-lg text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
               <div className="flex gap-2">
                  <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Edit Review</button>
                  <span className="text-muted-foreground">•</span>
                  <button className="text-xs font-black uppercase tracking-widest text-destructive hover:underline">Delete</button>
               </div>
            </Card>
         ))}
      </div>
    </div>
  )
}

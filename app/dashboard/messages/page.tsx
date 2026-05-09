"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MessagesDashboardPage() {
  const conversations = [
    { id: 1, name: "Skyline Lounge Support", lastMsg: "Your VIP table is confirmed for Friday.", time: "2h ago", unread: true },
    { id: 2, name: "Manpreet (Concierge)", lastMsg: "The driver will arrive at 9:15 PM sharp.", time: "5h ago", unread: false },
    { id: 3, name: "Pulse Nightclub", lastMsg: "Check out our new weekend lineup!", time: "1d ago", unread: false },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Messages</h1>
        <p className="text-muted-foreground font-medium">Direct line to venues and your personal concierge.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         <Card className="lg:col-span-4 rounded-[2.5rem] border-none shadow-xl h-[600px] flex flex-col">
            <div className="p-6 border-b">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search chats..." className="pl-9 rounded-xl bg-muted/30 border-none" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               {conversations.map(chat => (
                  <div key={chat.id} className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${chat.unread ? "bg-primary/5 border-l-4 border-primary" : "hover:bg-muted/50"}`}>
                     <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <User className="h-6 w-6 text-muted-foreground" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                           <h4 className="font-bold truncate">{chat.name}</h4>
                           <span className="text-[10px] text-muted-foreground font-bold">{chat.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMsg}</p>
                     </div>
                  </div>
               ))}
            </div>
         </Card>

         <Card className="lg:col-span-8 rounded-[2.5rem] border-none shadow-xl bg-muted/5 flex flex-col items-center justify-center p-12 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
               <MessageSquare className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Select a conversation</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2">Pick a chat from the left to view your message history and contact support.</p>
         </Card>
      </div>
    </div>
  )
}

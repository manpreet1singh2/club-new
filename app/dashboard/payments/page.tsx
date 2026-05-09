"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Download, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentsDashboardPage() {
  const transactions = [
    { id: "TX-9012", venue: "Skyline Lounge", amount: 30.00, method: "Visa •••• 4242", status: "completed", date: "May 12, 2026" },
    { id: "TX-5678", venue: "Pulse Nightclub", amount: 15.00, method: "UPI", status: "completed", date: "May 08, 2026" },
    { id: "TX-1234", venue: "Echo Club", amount: 22.50, method: "Mastercard •••• 8888", status: "refunded", date: "April 28, 2026" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Payment History</h1>
          <p className="text-muted-foreground font-medium">Transparent billing and transaction management.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-2 h-12 font-bold">
           <CreditCard className="mr-2 h-4 w-4" /> Manage Methods
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="rounded-3xl border-none shadow-xl p-8 bg-primary text-primary-foreground">
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Total Spent (2026)</p>
            <p className="text-4xl font-black tracking-tighter mt-2">$452.50</p>
         </Card>
         <Card className="rounded-3xl border-none shadow-xl p-8">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Active Refunds</p>
            <p className="text-4xl font-black tracking-tighter mt-2">1</p>
         </Card>
         <Card className="rounded-3xl border-none shadow-xl p-8">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rewards Earned</p>
            <p className="text-4xl font-black tracking-tighter mt-2">$45.00</p>
         </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-muted/50 border-b">
                  <tr>
                     <th className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Transaction</th>
                     <th className="py-5 font-black uppercase text-[10px] tracking-widest">Venue</th>
                     <th className="py-5 font-black uppercase text-[10px] tracking-widest">Amount</th>
                     <th className="py-5 font-black uppercase text-[10px] tracking-widest">Status</th>
                     <th className="px-8 py-5 text-right font-black uppercase text-[10px] tracking-widest">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {transactions.map(tx => (
                     <tr key={tx.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-8 py-6">
                           <div className="space-y-0.5">
                              <div className="font-bold">{tx.id}</div>
                              <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{tx.date}</div>
                           </div>
                        </td>
                        <td className="py-6 font-bold">{tx.venue}</td>
                        <td className="py-6">
                           <div className="space-y-0.5">
                              <div className="font-black text-lg">${tx.amount.toFixed(2)}</div>
                              <div className="text-[10px] text-muted-foreground font-bold uppercase">{tx.method}</div>
                           </div>
                        </td>
                        <td className="py-6">
                           <Badge variant={tx.status === 'completed' ? 'success' : 'destructive'} className="font-black uppercase tracking-widest text-[9px] px-3">
                              {tx.status}
                           </Badge>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary">
                              <Download className="h-4 w-4" />
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  )
}

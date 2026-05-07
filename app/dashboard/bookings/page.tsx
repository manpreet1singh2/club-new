import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const bookings = [
  { id:"BK-0012", club:"Skyline Lounge",    date:"May 17, 2025", time:"10:00 PM", guests:4, package:"VIP Table",  amount:"$120", status:"confirmed" },
  { id:"BK-0011", club:"Pulse Nightclub",   date:"May 10, 2025", time:"09:00 PM", guests:2, package:"Standard",  amount:"$40",  status:"completed" },
  { id:"BK-0010", club:"Echo Club",         date:"Apr 28, 2025", time:"11:00 PM", guests:6, package:"Full Combo", amount:"$200", status:"completed" },
  { id:"BK-0009", club:"Velvet Underground",date:"Apr 15, 2025", time:"08:00 PM", guests:3, package:"VIP Table",  amount:"$150", status:"cancelled" },
]
const statusBadge: Record<string,string> = { confirmed:"bg-blue-100 text-blue-700", completed:"bg-green-100 text-green-700", cancelled:"bg-red-100 text-red-700" }

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">My Bookings</h2><p className="text-muted-foreground">Track all your club reservations</p></div>
        <Button><Calendar className="mr-2 h-4 w-4"/>New Booking</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{label:"Total Bookings",v:"12",icon:Calendar},{label:"Upcoming",v:"1",icon:Clock},{label:"Completed",v:"10",icon:CheckCircle}].map(s=>(
          <Card key={s.label}><CardContent className="pt-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><s.icon className="h-5 w-5 text-primary"/></div>
            <div><p className="text-2xl font-bold">{s.v}</p><p className="text-sm text-muted-foreground">{s.label}</p></div>
          </CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Booking History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Club</TableHead><TableHead>Date</TableHead><TableHead>Guests</TableHead><TableHead>Package</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {bookings.map(b=>(
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell className="font-medium">{b.club}</TableCell>
                  <TableCell>{b.date} · {b.time}</TableCell>
                  <TableCell>{b.guests}</TableCell>
                  <TableCell>{b.package}</TableCell>
                  <TableCell className="font-bold">{b.amount}</TableCell>
                  <TableCell><span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge[b.status]}`}>{b.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4 space-y-6">
      <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
        <Ticket className="h-7 w-7 text-primary" /><span>ClubSpot</span>
      </Link>
      <div className="space-y-2">
        <h1 className="text-8xl font-black text-primary">404</h1>
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <div className="flex gap-3">
        <Link href="/"><Button>Go Home</Button></Link>
        <Link href="/clubs"><Button variant="outline">Browse Clubs</Button></Link>
      </div>
    </div>
  )
}

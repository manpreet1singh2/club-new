"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Ticket, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/clubs",  label: "Clubs"  },
  { href: "/events", label: "Events" },
  { href: "/about",  label: "About"  },
  { href: "/contact",label: "Contact"},
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Ticket className="h-6 w-6 text-primary" />
          <span>ClubSpot</span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === l.href ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
          <Link href="/signup"><Button size="sm">Sign up</Button></Link>
        </div>
        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="flex items-center gap-2 font-bold text-xl mb-8">
              <Ticket className="h-6 w-6 text-primary" /><span>ClubSpot</span>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="text-sm font-medium hover:text-primary transition-colors py-2 border-b border-border last:border-0">
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Link href="/login"><Button variant="outline" className="w-full">Log in</Button></Link>
                <Link href="/signup"><Button className="w-full">Sign up</Button></Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

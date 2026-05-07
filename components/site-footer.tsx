import Link from "next/link"
import { Ticket, Instagram, Twitter, Facebook } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Ticket className="h-5 w-5 text-primary" /><span>ClubSpot</span>
          </Link>
          <p className="text-sm text-muted-foreground">The smartest way to discover, book, and enjoy the best nightlife experiences.</p>
          <div className="flex gap-3 pt-1">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Clubs","/clubs"],["Events","/events"],["Trending","/#trending"],["Near Me","/#nearby"]].map(([l,h])=>(
              <li key={h}><Link href={h} className="hover:text-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["About","/about"],["Contact","/contact"],["Careers","#"],["Blog","#"]].map(([l,h])=>(
              <li key={h}><Link href={h} className="hover:text-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Terms","/terms"],["Privacy","/privacy"],["Cookie Policy","#"]].map(([l,h])=>(
              <li key={h}><Link href={h} className="hover:text-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ClubSpot. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ for nightlife lovers</p>
        </div>
      </div>
    </footer>
  )
}

import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://clubspot.app'),
  title: { default: 'ClubSpot — Discover & Book the Best Nightclubs', template: '%s | ClubSpot' },
  description: 'Discover top-rated clubs, reserve tables, buy event tickets and organize private events — all in one place. Trusted by 50,000+ nightlife lovers.',
  keywords: ['nightclub booking', 'club reservation', 'table booking', 'nightlife', 'events', 'VIP tables'],
  openGraph: {
    type: 'website', siteName: 'ClubSpot',
    title: 'ClubSpot — Discover & Book the Best Nightclubs',
    description: 'Book tables, buy tickets, plan events at the best clubs near you.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}

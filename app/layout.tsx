import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Nightclub OS',
  description: 'Nightclub booking platform for venues, events, tables, and guest-list operations.',
  metadataBase: new URL('https://nightclub-os.example'),
  openGraph: {
    title: 'Nightclub OS',
    description: 'Venue discovery, booking management, event operations, and admin dashboards.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

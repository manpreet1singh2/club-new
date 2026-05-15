import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Nightclub OS',
  description: 'Production nightclub booking platform with venue discovery, bookings, CRM, QR tickets, billing, and transport operations.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-night-950 text-slate-100 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'The Night Crew',
  description: 'We build AI employees for businesses that automate sales, support, operations, and lead generation.',
  metadataBase: new URL('https://thenightcrew.club'),
  openGraph: {
    title: 'The Night Crew',
    description: 'AI employees for sales, support, operations, and lead generation.',
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

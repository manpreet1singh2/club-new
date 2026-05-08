import Link from 'next/link';

const navItems = [
  { href: '/venues', label: 'Venues' },
  { href: '/events', label: 'Events' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/dashboard', label: 'Dashboard' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-900/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-wide text-white">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-velvet-500 to-night-500 shadow-glow">N</span>
          Nightclub OS
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/#book" className="btn-primary hidden sm:inline-flex">
          Book a table
        </Link>
      </div>
    </header>
  );
}

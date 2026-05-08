import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-velvet-200">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-slate-300">The requested page does not exist in the Nightclub OS experience.</p>
      <Link href="/" className="btn-primary mt-8 inline-flex">Back home</Link>
    </div>
  );
}

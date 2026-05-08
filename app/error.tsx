"use client";

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-velvet-200">Error</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Something went wrong</h1>
      <p className="mt-4 text-slate-300">{error.message}</p>
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-secondary">Back home</Link>
      </div>
    </div>
  );
}

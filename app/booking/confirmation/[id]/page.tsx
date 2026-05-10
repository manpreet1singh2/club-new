import Link from 'next/link';

type BookingConfirmationPageProps = {
  params: {
    id: string;
  };
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-2 text-base font-medium text-white">{value}</p>
    </div>
  );
}

export default function BookingConfirmationPage({ params }: BookingConfirmationPageProps) {
  const bookingId = params.id;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 lg:py-16">
      <div className="panel overflow-hidden p-6 md:p-10">
        <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-200">
          Booking Confirmed!
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Your reservation is locked in.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          We do not have a database lookup wired yet, so this page shows placeholder details for now.
          Your booking ID below is the reference you can use for future lookup and support.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <DetailRow label="Booking ID" value={bookingId} />
          <DetailRow label="Venue" value="Velvet Lounge" />
          <DetailRow label="Event" value="Midnight Sessions" />
          <DetailRow label="Date" value="Saturday, 10 May 2026" />
          <DetailRow label="Time" value="10:30 PM" />
          <DetailRow label="Status" value="Confirmed" />
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-night-900/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Next steps</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>• Keep this booking ID handy for support and guest check-in.</li>
            <li>• A detailed ticket view can be linked here once lookup is available.</li>
            <li>• Transport and payment status can be added to this page later.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Open dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

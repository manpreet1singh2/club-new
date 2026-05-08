import type { DashboardMetrics } from '@/lib/types';

type MetricItem = {
  key: keyof DashboardMetrics;
  label: string;
  prefix?: string;
  suffix?: string;
};

const items: MetricItem[] = [
  { key: 'totalVenues', label: 'Venues' },
  { key: 'activeEvents', label: 'Events' },
  { key: 'confirmedBookings', label: 'Confirmed bookings' },
  { key: 'waitlistBookings', label: 'Waitlist' },
  { key: 'avgOccupancy', label: 'Avg occupancy', suffix: '%' },
  { key: 'conversionRate', label: 'Conversion rate', suffix: '%' },
  { key: 'revenueProjection', label: 'Revenue projection', prefix: '₹' },
  { key: 'advanceCollected', label: 'Advance collected', prefix: '₹' },
  { key: 'transportScheduled', label: 'Transport scheduled' },
  { key: 'automationCount', label: 'WhatsApp automations' }
];

export function MetricsGrid({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const value = metrics[item.key];
        return (
          <article key={item.key} className="panel-soft p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {item.prefix ?? ''}
              {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
              {item.suffix ?? ''}
            </p>
          </article>
        );
      })}
    </div>
  );
}

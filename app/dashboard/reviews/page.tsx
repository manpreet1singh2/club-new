import Link from 'next/link'
import { ArrowLeft, MessageSquareQuote, RefreshCcw, Star, ThumbsUp, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const reviews = [
  {
    name: 'Aarav Mehta',
    venue: 'Orbit Lounge',
    rating: 5,
    source: 'Google',
    status: 'responded',
    time: '18 minutes ago',
    comment:
      'Fast guest list confirmation and smooth table handoff. The team kept everything on schedule even after our headcount changed.',
  },
  {
    name: 'Priya Dutta',
    venue: 'Arcade 88',
    rating: 5,
    source: 'Instagram DM',
    status: 'needs follow-up',
    time: '1 hour ago',
    comment:
      'Loved the beach setup and the bottle service pacing. Would book again, but wanted a slightly earlier transport slot next time.',
  },
  {
    name: 'Rohit Saini',
    venue: 'Luxe District',
    rating: 4,
    source: 'Email',
    status: 'scheduled',
    time: 'Today',
    comment:
      'The anniversary package was polished and the host communication was excellent. A clearer menu preview before arrival would help.',
  },
]

const insights = [
  { label: 'Average rating', value: '4.8/5', detail: 'Across the latest 120 guest reviews', icon: Star },
  { label: 'Positive sentiment', value: '92%', detail: 'Guests praised entry speed and host coordination', icon: ThumbsUp },
  { label: 'New reviews', value: '18', detail: 'Added during the last 7 days', icon: Users },
  { label: 'Response SLA', value: '12 min', detail: 'Median time to first reply this week', icon: RefreshCcw },
]

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Dashboard</p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <h1 className="section-title">Guest reviews and reputation control</h1>
            <p className="section-copy max-w-3xl">
              Track sentiment across clubs, respond to feedback quickly, and spot service gaps before they affect the next night.
            </p>
          </div>
          <Button asChild variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="panel-soft border-white/10 bg-white/5">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle className="mt-2 text-3xl text-white">{item.value}</CardTitle>
                </div>
                <div className="rounded-2xl bg-velvet-500/15 p-3 text-velvet-200">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-300">{item.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="panel-soft border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Recent guest reviews</CardTitle>
            <CardDescription>Prioritize the newest feedback and close the loop with guests fast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <div key={review.name} className="rounded-3xl border border-white/10 bg-night-900/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                      <Badge className="border-white/10 bg-white/10 text-white/80 hover:bg-white/10">{review.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{review.venue} · {review.source}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{review.time}</p>
                </div>

                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < review.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">&ldquo;{review.comment}&rdquo;</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="panel-soft border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Response playbook</CardTitle>
              <CardDescription>Use these quick actions to keep reviews moving.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-300">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-night-900/70 p-4">
                <MessageSquareQuote className="mt-1 h-5 w-5 text-velvet-200" />
                <div>
                  <p className="font-medium text-white">Reply within the hour</p>
                  <p>Confirm the guest issue, thank them for the note, and keep the response short.</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-night-900/70 p-4">
                <RefreshCcw className="mt-1 h-5 w-5 text-velvet-200" />
                <div>
                  <p className="font-medium text-white">Escalate service gaps</p>
                  <p>Route transport, host, or kitchen issues to the relevant team before the next event night.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="panel-soft border-white/10 bg-gradient-to-br from-velvet-500/20 via-night-900/80 to-night-900">
            <CardHeader>
              <CardTitle className="text-white">Next reputation task</CardTitle>
              <CardDescription>Close the loop on the newest follow-up review before tonight's peak rush.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-white text-night-950 hover:bg-white/90">
                <Link href="/contact">Send a response plan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

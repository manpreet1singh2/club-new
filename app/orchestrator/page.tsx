import Link from 'next/link';
import { getLaunchOverview } from '@/lib/master-orchestrator';

export default async function OrchestratorPage() {
  const overview = getLaunchOverview();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-10 md:px-8 lg:py-16">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-velvet-200">Master Orchestrator</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">All 61 agents are grouped, routable, and demo-ready.</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
          This launch view routes requests across Sales, Content, Customer Support, Operations, and Executive while keeping a simple memory log and department-level tool access controls.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/api/orchestrator" className="btn-primary">View API snapshot</Link>
          <Link href="/" className="btn-secondary">Back to home</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {overview.departments.map((department) => (
          <div key={department.department} className="panel-soft p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-velvet-200">{department.department}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{department.count}</p>
            <p className="mt-2 text-sm text-slate-400">active agents</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Tools</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{department.toolAccess.join(', ')}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Routing snapshot</p>
          <h2 className="section-title mt-2">How the master router behaves</h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
            <li>• Sales keywords route to pipeline, discovery, deal, and proposal specialists.</li>
            <li>• Content keywords route to content, brand, SEO, social, and video specialists.</li>
            <li>• Support keywords route to ticket handling, escalation, and refund support agents.</li>
            <li>• Operations keywords route to project, finance, and workflow operators.</li>
            <li>• Executive requests default to chief-of-staff and governance support.</li>
          </ul>
        </div>
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Memory</p>
          <h2 className="section-title mt-2">Recent routed events</h2>
          <div className="mt-6 space-y-4">
            {overview.recentEvents.length === 0 ? (
              <p className="text-sm text-slate-400">No events yet. Send a request to the /api/orchestrator endpoint to populate memory.</p>
            ) : overview.recentEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <p className="font-medium text-white">{event.agentName} · {event.department}</p>
                <p className="mt-2 line-clamp-3 text-slate-400">{event.input}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{event.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-soft p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-velvet-200">Launch status</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-400">Agent count</p>
            <p className="mt-2 text-3xl font-semibold text-white">{overview.agentCount}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Memory events</p>
            <p className="mt-2 text-3xl font-semibold text-white">{overview.totalEvents}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Launch</p>
            <p className="mt-2 text-3xl font-semibold text-white">ready</p>
          </div>
        </div>
      </section>
    </div>
  );
}

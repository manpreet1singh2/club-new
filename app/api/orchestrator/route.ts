import { NextResponse } from 'next/server';
import { getLaunchOverview, routeTask } from '@/lib/master-orchestrator';

export async function GET() {
  return NextResponse.json(getLaunchOverview());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as Record<string, unknown>));
  const input = typeof body.input === 'string' ? body.input : '';
  if (!input.trim()) {
    return NextResponse.json({ error: 'input is required' }, { status: 400 });
  }

  const requestedTools = Array.isArray(body.requestedTools)
    ? body.requestedTools.filter((tool: unknown): tool is string => typeof tool === 'string')
    : [];

  return NextResponse.json(routeTask({
    input,
    requestedTools,
    channel: typeof body.channel === 'string' ? body.channel : 'demo',
  }));
}

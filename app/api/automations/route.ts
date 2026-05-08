import { NextResponse } from 'next/server';
import { listAutomationEvents, listAutomations } from '@/lib/store';

export async function GET() {
  const [automations, events] = await Promise.all([listAutomations(), listAutomationEvents()]);
  return NextResponse.json({ automations, events }, { headers: { 'Cache-Control': 'no-store' } });
}

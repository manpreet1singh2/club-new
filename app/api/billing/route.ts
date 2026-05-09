import { NextResponse } from 'next/server';
import { getBillingSummary, listBillingRecords } from '@/lib/store';

export async function GET() {
  const [records, summary] = await Promise.all([listBillingRecords(), getBillingSummary()]);
  return NextResponse.json({ records, summary }, { headers: { 'Cache-Control': 'no-store' } });
}

import type { Metadata } from 'next';
import { AgentsDashboard } from '@/components/agents-dashboard';

export const metadata: Metadata = {
  title: 'AI Agents — The Night Crew',
  description: 'Personal AI agents for sales, support, content, ops, research, code, and strategy.',
};

export default function AgentsPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <AgentsDashboard />
    </main>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';

type Role = 'user' | 'ai';
interface Message {
  role: Role;
  text: string;
  typing?: boolean;
}

interface Agent {
  id: string;
  icon: string;
  name: string;
  desc: string;
  system: string;
  prompts: string[];
}

const AGENTS: Agent[] = [
  {
    id: 'sales',
    icon: '📈',
    name: 'Sales Agent',
    desc: 'Cold outreach, follow-ups, proposals',
    system:
      'You are a sharp sales agent for The Night Crew IT Solutions, an AI automation agency based in India. Help craft cold outreach emails, follow-up messages, client proposals, and sales scripts. Be direct, persuasive, and professional. Keep responses concise and actionable.',
    prompts: ['Write a cold email to a restaurant owner', 'Follow-up after a discovery call', 'Pitch AI automation ROI in 3 bullets'],
  },
  {
    id: 'support',
    icon: '🎧',
    name: 'Support Agent',
    desc: 'Client replies, escalations, FAQs',
    system:
      'You are a client support specialist for The Night Crew IT Solutions. Help draft professional support replies, handle escalations gracefully, write FAQ answers, and create client communication templates. Tone: warm, professional, solution-focused.',
    prompts: ['Reply to an unhappy client', 'Write FAQ for our services', 'Escalation email template'],
  },
  {
    id: 'leads',
    icon: '🎯',
    name: 'Lead Gen Agent',
    desc: 'Prospect research, outreach sequences',
    system:
      'You are a lead generation specialist for an AI agency. Help identify ideal client profiles, write LinkedIn connection messages, create prospect research frameworks, and build outreach sequences. Be strategic and conversion-focused.',
    prompts: ['ICP for local restaurant chains', 'LinkedIn DM to a business owner', '10 qualifying questions for a prospect'],
  },
  {
    id: 'content',
    icon: '✍️',
    name: 'Content Agent',
    desc: 'Posts, captions, threads, blogs',
    system:
      'You are a content strategist and copywriter for The Night Crew IT Solutions. Create punchy LinkedIn posts, Twitter/X threads, blog outlines, and social captions. Tone: confident, modern, founder-voice — like someone who ships and knows it.',
    prompts: ['LinkedIn post about AI automation', 'Twitter thread on AI agents for SMBs', 'Blog intro: future of AI employees'],
  },
  {
    id: 'ops',
    icon: '⚙️',
    name: 'Ops Agent',
    desc: 'SOPs, checklists, project plans',
    system:
      'You are an operations specialist. Help create standard operating procedures, project plans, onboarding checklists, client handoff docs, and workflow documentation. Be structured, thorough, and use clear formatting.',
    prompts: ['SOP for client onboarding', 'Project delivery checklist', 'Weekly ops review format'],
  },
  {
    id: 'research',
    icon: '🔍',
    name: 'Research Agent',
    desc: 'Market research, competitor analysis',
    system:
      'You are a strategic research analyst. Provide market research summaries, competitive analysis, industry trend reports, and actionable business insights. Be factual, structured, and cite reasoning clearly.',
    prompts: ['AI agency market overview 2025', 'Top competitor services & pricing', 'SMB pain points AI can solve'],
  },
  {
    id: 'code',
    icon: '💻',
    name: 'Code Agent',
    desc: 'Snippets, reviews, debugging help',
    system:
      'You are a senior full-stack engineer. Help debug code, write clean code snippets, review logic, explain technical concepts. Default stack: Next.js, TypeScript, Tailwind CSS, Node.js. Be concise and practical.',
    prompts: ['Fix this TypeScript error', 'Write a React custom hook', 'Review this API response handler'],
  },
  {
    id: 'strategy',
    icon: '🧠',
    name: 'Strategy Agent',
    desc: 'Growth strategy, pricing, positioning',
    system:
      'You are a startup strategist and growth advisor. Help with business model thinking, pricing strategy, service positioning, growth tactics, and decision frameworks. Be bold, practical, and ROI-focused.',
    prompts: ['Pricing model for AI agency', 'Growth strategy for next quarter', 'How to package our services'],
  },
];

export function AgentsDashboard() {
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectAgent = (agent: Agent) => {
    setActiveAgent(agent);
    setMessages([{ role: 'ai', text: `Hi! I'm your ${agent.name}. What do you need help with?` }]);
    setInput('');
  };

  const sendMessage = async (text: string) => {
    if (loading || !activeAgent || !text.trim()) return;
    const userMsg = text.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages([...newMessages, { role: 'ai', text: '...', typing: true }]);
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: activeAgent.system, messages: apiMessages }),
      });

      const data = await res.json();
      const reply: string = data.reply || 'Sorry, something went wrong. Please try again.';
      setMessages([...newMessages, { role: 'ai', text: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'ai', text: 'Connection error. Check your API key and try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <span className="text-2xl">🌙</span>
        <div>
          <h1 className="text-xl font-semibold text-white">Night Crew Agents</h1>
          <p className="text-sm text-slate-400">Personal AI workspace · 8 specialized agents</p>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => selectAgent(agent)}
            className={`rounded-xl border p-4 text-left transition-all duration-150 ${
              activeAgent?.id === agent.id
                ? 'border-violet-500/60 bg-violet-950/40 text-white'
                : 'border-white/8 bg-white/4 text-slate-300 hover:border-white/20 hover:bg-white/8'
            }`}
          >
            <span className="mb-2 block text-xl">{agent.icon}</span>
            <p className="text-sm font-medium leading-tight">{agent.name}</p>
            <p className="mt-1 text-xs text-slate-500">{agent.desc}</p>
          </button>
        ))}
      </div>

      {/* Chat Panel */}
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a14]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3.5">
          <span
            className={`h-2 w-2 rounded-full ${activeAgent ? 'bg-emerald-500' : 'bg-slate-600'}`}
          />
          <span className="text-sm font-medium text-white">
            {activeAgent ? `${activeAgent.name} — ready` : 'Select an agent above to start'}
          </span>
        </div>

        {/* Quick Prompts */}
        {activeAgent && (
          <div className="flex flex-wrap gap-2 border-b border-white/6 px-5 py-3">
            {activeAgent.prompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                disabled={loading}
                className="rounded-lg border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/20 hover:text-white disabled:opacity-40"
              >
                ⚡ {p}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex min-h-[280px] flex-col gap-3 overflow-y-auto p-5 max-h-[380px]">
          {messages.length === 0 && (
            <p className="text-sm text-slate-500">
              👋 Welcome. Pick any agent above to get started — each one is specialized for a different task.
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'ml-auto bg-violet-700/30 text-violet-100 border border-violet-500/20'
                  : msg.typing
                  ? 'bg-white/4 text-slate-500 italic border border-white/6'
                  : 'bg-white/5 text-slate-200 border border-white/8'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={msgsEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3 border-t border-white/8 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder={activeAgent ? `Ask ${activeAgent.name} anything...` : 'Select an agent first...'}
            disabled={!activeAgent || loading}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-violet-500/50 focus:outline-none disabled:opacity-40"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!activeAgent || loading || !input.trim()}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-600">
        Powered by Claude · The Night Crew IT Solutions · thenightcrew.club
      </p>
    </div>
  );
}

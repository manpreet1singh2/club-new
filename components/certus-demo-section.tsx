import { FileText, Play, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const transcriptParagraphs: string[] = [];

export function CertusDemoSection() {
  return (
    <section className="space-y-6">
      <div className="panel overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-cyan-300">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              Certus AI demo
            </div>

            <div className="space-y-4">
              <h2 className="section-title">A premium audio walkthrough built for speed, clarity, and conversion</h2>
              <p className="section-copy">
                Present the Certus AI experience with a fast-loading, mobile-friendly audio player and a clean transcript panel that keeps the narrative easy to scan.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Fast streaming', 'Mobile-ready', 'Accessible playback', 'Transcript support'].map((item) => (
                <span
                  key={item}
                  className="chip border border-white/10 bg-white/[0.04] text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#08101d] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Audio demo</p>
                  <p className="mt-1 text-sm text-slate-200">Certus AI Website MP3 Audio Demo</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                  <Play className="h-3 w-3" aria-hidden="true" />
                  Play audio
                </div>
              </div>

              <audio
                controls
                preload="metadata"
                className="w-full"
                aria-label="Certus AI audio demo"
              >
                <source
                  src="https://cdn.prod.website-files.com/694d1ac7dc0a1e269d102252/6964982eefb3f2fad1305991_Certus%20AI%20Website%20MP3%20Audio%20Demo%20(1).mp3"
                  type="audio/mpeg"
                />
              </audio>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: 'Load profile',
                  value: 'Optimized',
                  detail: 'Metadata-preloaded for quick first interaction.'
                },
                {
                  label: 'Playback UX',
                  value: 'Native',
                  detail: 'Uses browser controls for familiar mobile and desktop behavior.'
                },
                {
                  label: 'Narrative flow',
                  value: 'Focused',
                  detail: 'Designed to keep the message clear and conversion-oriented.'
                }
              ].map((item) => (
                <div key={item.label} className="panel-soft rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-soft rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Transcript</p>
                <h3>Ready for the approved copy</h3>
              </div>
              <FileText className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            </div>

            {transcriptParagraphs.length > 0 ? (
              <div className="space-y-4 text-sm leading-7 text-slate-200">
                {transcriptParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  Transcript content was not included in the available task input. Paste the approved transcript into <code className="rounded bg-white/5 px-1.5 py-0.5 text-cyan-200">transcriptParagraphs</code> and it will render here.
                </p>
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2">
                  {[
                    'Accessible, scan-friendly layout',
                    'Clean typographic hierarchy',
                    'Supports long-form narration'
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#08101d] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                High-performance delivery
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The section is structured to stay lightweight, readable, and conversion-focused while keeping the transcript easy to swap in once the final copy is available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

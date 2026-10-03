import React from 'react';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';

const STEPS = [
  {
    number: '01',
    title: 'Find',
    description: 'Search for something you need. Browse by category, hostel zone, or price range.',
    note: 'Zero listing or sale commission',
  },
  {
    number: '02',
    title: 'Connect',
    description: 'Chat directly with the seller. Negotiate a fair price and agree on a campus handover spot.',
    note: 'Direct campus chat',
  },
  {
    number: '03',
    title: 'Exchange',
    description: 'Meet at a familiar campus location. Check the item and pay the seller directly.',
    note: 'In-person campus pickup',
  },
];

const HANDOVER_HUBS = ['KC Market', 'Central Library', 'Ganga Dhaba', 'Tapti Mess Foyer'];

export const HowItWorks = () => (
  <section id="how-it-works" className="border-t border-paper-border bg-paper-50 py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-campus-blue">Built exclusively for JNU</p>
        <h2 className="font-sans text-3xl font-bold tracking-tight text-navy-950">
          Simple. Transparent.<br className="sm:hidden" /> Campus Exchange.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy-700/70">
          No shipping fees or payment escrow. Connect directly with fellow students and exchange items on campus.
        </p>
      </header>

      <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0">
        <div className="absolute left-[16.67%] right-[16.67%] top-8 hidden h-px bg-paper-darkBorder sm:block" />
        {STEPS.map(({ number, title, description, note }, index) => (
          <ScrollReveal key={number} delay={index * 80}>
            <article className="relative flex flex-col items-center px-4 py-6 text-center">
              <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-paper-darkBorder bg-white shadow-subtle">
                <span className="font-sans text-2xl font-bold tabular-nums text-navy-950">{number}</span>
              </div>
              <h3 className="font-sans mb-2 text-xl font-bold text-navy-950">{title}</h3>
              <p className="max-w-[240px] text-sm leading-relaxed text-navy-700/80">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded border border-blue-100 bg-white px-2 py-1.5 text-[10px] font-medium text-campus-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-campus-blue" /> {note}
              </span>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-paper-darkBorder bg-white p-5 text-center shadow-subtle">
        <h3 className="mb-2 text-xs font-semibold text-navy-900">Suggested campus handover locations</h3>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-medium text-navy-700/80">
          {HANDOVER_HUBS.map((hub, index) => (
            <React.Fragment key={hub}>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-campus-blue" /> {hub}
              </span>
              {index < HANDOVER_HUBS.length - 1 && <span className="text-paper-darkBorder">·</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-navy-700/55">Choose a familiar, public campus location for your exchange.</p>
      </div>
    </div>
  </section>
);

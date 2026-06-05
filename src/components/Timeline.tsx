'use client';

import { motion } from 'framer-motion';
import {
  IconAtom,
  IconDatabase,
  IconCode,
  IconServer,
  IconRocket,
} from '@tabler/icons-react';
import { JOURNEY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { TimelineMilestone } from '@/lib/types';

const ICONS: Record<TimelineMilestone['icon'], React.ElementType> = {
  atom: IconAtom,
  database: IconDatabase,
  code: IconCode,
  server: IconServer,
  rocket: IconRocket,
};

export default function Timeline() {
  return (
    <section id="journey" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            My Journey
          </p>
          <h2 className="text-[2rem] font-semibold tracking-tight text-slate-800 dark:text-slate-100 leading-tight mb-4">
            The Evolution
          </h2>
          <p className="text-base leading-[1.8] text-slate-500 dark:text-slate-400">
            From nuclear engineering foundations to building data systems at scale, a career
            shaped by curiosity and the belief that rigorous thinking applies everywhere.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-700" />

          {/* Left side line (mobile) */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-700" />

          <div className="flex flex-col gap-0">
            {JOURNEY.map((milestone, index) => {
              const Icon = ICONS[milestone.icon];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className={cn(
                    'relative flex items-center gap-0 mb-14',
                    // Desktop: alternating sides
                    'md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0',
                  )}
                >
                  {/* Desktop left card */}
                  <div
                    className={cn(
                      'hidden md:flex',
                      isLeft ? 'justify-end pr-10' : 'justify-start pr-10 opacity-0 pointer-events-none',
                    )}
                  >
                    {isLeft && <MilestoneCard milestone={milestone} Icon={Icon} />}
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-0">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-white dark:border-midnight ring-4 ring-cyan-500/20 relative z-10" />
                  </div>

                  {/* Desktop right card */}
                  <div
                    className={cn(
                      'hidden md:flex',
                      !isLeft ? 'justify-start pl-10' : 'justify-end pl-10 opacity-0 pointer-events-none',
                    )}
                  >
                    {!isLeft && <MilestoneCard milestone={milestone} Icon={Icon} />}
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-5 pl-3">
                    <div className="shrink-0 flex flex-col items-center pt-1">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 border-2 border-white dark:border-midnight ring-4 ring-cyan-500/20 flex items-center justify-center relative z-10">
                        <Icon size={13} stroke={2} className="text-white" />
                      </div>
                    </div>
                    <MilestoneCard milestone={milestone} Icon={Icon} mobile />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone,
  Icon,
  mobile = false,
}: {
  milestone: TimelineMilestone;
  Icon: React.ElementType;
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-surface dark:bg-midnight-soft border border-slate-200 dark:border-slate-800 rounded-xl p-6',
        mobile ? 'flex-1' : 'max-w-sm',
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/10 flex items-center justify-center shrink-0">
          <Icon size={18} stroke={2} className="text-cyan-500" />
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-0.5">
            {milestone.period}
          </p>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-tight">
            {milestone.title}
          </h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {milestone.description}
      </p>
    </div>
  );
}

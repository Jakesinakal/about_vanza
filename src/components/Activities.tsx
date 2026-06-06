'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  IconCode, IconPencil, IconTrophy, IconUsers, IconRocket, IconArrowRight,
} from '@tabler/icons-react';
import { ACTIVITIES } from '@/lib/constants';
import type { Activity } from '@/lib/types';

const ICONS: Record<Activity['icon'], React.ElementType> = {
  code: IconCode, pencil: IconPencil, trophy: IconTrophy,
  users: IconUsers, rocket: IconRocket,
};

const ACCENT: Record<Activity['accent'], { bg: string; text: string; label: string; border: string }> = {
  cyan:    { bg: 'bg-cyan-500/10',    text: 'text-cyan-500',    label: 'text-cyan-400',    border: 'border-cyan-500'    },
  violet:  { bg: 'bg-violet-500/10',  text: 'text-violet-500',  label: 'text-violet-400',  border: 'border-violet-500'  },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-500',   label: 'text-amber-400',   border: 'border-amber-500'   },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'text-emerald-400', border: 'border-emerald-500' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-500',    label: 'text-rose-400',    border: 'border-rose-500'    },
};

export default function Activities() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const active = ACTIVITIES[activeIndex];
  const Icon = ICONS[active.icon];
  const accent = ACCENT[active.accent];

  return (
    <section id="activities" className="py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-xl"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-500 mb-3">
            My Activities
          </p>
          <h2 className="text-[2rem] font-semibold tracking-tight text-slate-800 dark:text-slate-100 leading-tight mb-4">
            Beyond the Code
          </h2>
          <p className="text-base leading-[1.8] text-slate-500 dark:text-slate-400">
            The things that keep me growing, connected, and building outside the day-to-day.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-stretch">

          {/* Left: activity list */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:w-64 shrink-0">
            {ACTIVITIES.map((activity, i) => {
              const ItemIcon = ICONS[activity.icon];
              const itemAccent = ACCENT[activity.accent];
              const isActive = i === activeIndex;

              return (
                <button
                  key={activity.id}
                  onClick={() => setActiveIndex(i)}
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 shrink-0 lg:shrink border ${
                    isActive
                      ? 'bg-surface dark:bg-midnight-soft border-slate-200 dark:border-slate-700'
                      : 'border-transparent hover:bg-surface dark:hover:bg-midnight-soft hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`w-0.5 h-6 rounded-full shrink-0 transition-all duration-300 ${isActive ? itemAccent.border : 'border-transparent'} border-l-2`} />
                  <div className={`w-8 h-8 rounded-lg ${isActive ? itemAccent.bg : 'bg-slate-100 dark:bg-slate-800'} flex items-center justify-center shrink-0 transition-colors duration-200`}>
                    <ItemIcon size={16} stroke={1.5} className={isActive ? itemAccent.text : 'text-slate-400 dark:text-slate-500'} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-0.5 transition-colors duration-200 ${isActive ? itemAccent.label : 'text-slate-400 dark:text-slate-500'}`}>
                      {activity.category}
                    </p>
                    <p className={`text-sm font-medium leading-tight truncate transition-colors duration-200 ${isActive ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      {activity.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: active card */}
          <div className="flex-1 min-h-[420px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.comingSoon ? (
                  <>
                    {active.video ? (
                      <video
                        src={active.video}
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
                      />
                    ) : active.image && (
                      <Image
                        src={active.image} alt={active.title} fill
                        className="object-cover opacity-40 grayscale"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-10 bg-black/20">
                      <motion.span
                        className="text-sm font-semibold tracking-widest uppercase text-white border border-dashed border-white/50 rounded-full px-6 py-2.5"
                        animate={{ opacity: [0.5, 1, 0.5], scale: [0.97, 1, 0.97] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        Coming Soon
                      </motion.span>
                      <p className="text-base text-white/60 text-center max-w-sm">{active.title}</p>
                    </div>
                  </>
                ) : active.image ? (
                  <>
                    <Image
                      src={active.image} alt={active.title} fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                      style={{ objectPosition: active.imagePosition ?? 'center center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-10">
                      <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${accent.label}`}>
                        {active.category}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-semibold text-white leading-tight mb-3">
                        {active.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed text-slate-300 max-w-lg mb-6"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {active.description}
                      </p>
                      <button
                        onClick={() => router.push(`/activities/${active.slug}`)}
                        className="self-start flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 transition-all duration-200 group"
                      >
                        Read Story
                        <IconArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative z-10 flex flex-col h-full p-10 bg-surface dark:bg-midnight-soft">
                    <div className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center mb-6 shrink-0`}>
                      <Icon size={24} stroke={1.5} className={accent.text} />
                    </div>
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${accent.text}`}>
                      {active.category}
                    </p>
                    <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-tight mb-4">
                      {active.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-lg">
                      {active.description}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

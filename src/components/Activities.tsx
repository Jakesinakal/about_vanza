'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  IconCode, IconPencil, IconTrophy, IconUsers, IconRocket,
  IconChevronLeft, IconChevronRight,
} from '@tabler/icons-react';
import { ACTIVITIES } from '@/lib/constants';
import type { Activity } from '@/lib/types';

const ICONS: Record<Activity['icon'], React.ElementType> = {
  code: IconCode, pencil: IconPencil, trophy: IconTrophy,
  users: IconUsers, rocket: IconRocket,
};

const ACCENT: Record<Activity['accent'], {
  bg: string; text: string; label: string;
}> = {
  cyan:    { bg: 'bg-cyan-500/10',    text: 'text-cyan-500',    label: 'text-cyan-400'    },
  violet:  { bg: 'bg-violet-500/10',  text: 'text-violet-500',  label: 'text-violet-400'  },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-500',   label: 'text-amber-400'   },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'text-emerald-400' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-500',    label: 'text-rose-400'    },
};

const COUNT  = ACTIVITIES.length;
const DEG    = 360 / COUNT;
const RADIUS = 280;

export default function Activities() {
  const router   = useRouter();
  const discRef  = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const writeAngle = (angle: number) => {
    if (!discRef.current) return;
    angleRef.current = angle;
    discRef.current.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    discRef.current.style.transform  = `rotateY(${angle}deg)`;
  };

  const navigate = useCallback((dir: 1 | -1) => {
    const steps = Math.round(-angleRef.current / DEG) + dir;
    writeAngle(-steps * DEG);
    setActiveIndex(((steps % COUNT) + COUNT) % COUNT);
  }, []);

  const goTo = useCallback((target: number) => {
    const steps   = Math.round(-angleRef.current / DEG);
    const current = ((steps % COUNT) + COUNT) % COUNT;
    let   diff    = target - current;
    if (diff >  COUNT / 2) diff -= COUNT;
    if (diff < -COUNT / 2) diff += COUNT;
    writeAngle(-(steps + diff) * DEG);
    setActiveIndex(target);
  }, []);

  return (
    <section id="activities" className="py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-xl"
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

        {/* Carousel stage */}
        <div
          className="relative select-none"
          style={{ perspective: '1100px', height: '380px' }}
        >
          <div
            ref={discRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
              transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {ACTIVITIES.map((activity, i) => {
              const Icon   = ICONS[activity.icon];
              const accent = ACCENT[activity.accent];
              return (
                <button
                  key={activity.id}
                  onClick={() => {
                    if (i === activeIndex && !activity.comingSoon) {
                      router.push(`/activities/${activity.slug}`);
                    } else {
                      goTo(i);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: '-140px',
                    top: '-140px',
                    width: '280px',
                    height: '280px',
                    transform: `rotateY(${i * DEG}deg) translateZ(${RADIUS}px)`,
                    backfaceVisibility: 'hidden',
                    cursor: i === activeIndex ? 'default' : 'pointer',
                  }}
                  aria-label={activity.title}
                  onMouseEnter={() => { if (i === activeIndex && !activity.comingSoon) setHoveredIndex(i); }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative w-full h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface dark:bg-midnight-soft overflow-hidden flex flex-col text-left">

                    {activity.comingSoon ? (
                      /* ── Coming Soon card ── */
                      <>
                        {activity.video ? (
                          <video
                            src={activity.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
                          />
                        ) : activity.image && (
                          <div className="absolute inset-0 overflow-hidden rounded-2xl">
                            <Image
                              src={activity.image}
                              alt={activity.title}
                              fill
                              className="object-cover opacity-40 grayscale"
                              sizes="280px"
                            />
                          </div>
                        )}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 p-6">
                          <motion.span
                            className="text-sm font-semibold tracking-widest uppercase text-white border border-dashed border-white/50 rounded-full px-5 py-2"
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.97, 1, 0.97] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            Coming Soon
                          </motion.span>
                        </div>
                      </>
                    ) : activity.image ? (
                      /* ── Photo card ── */
                      <>
                        {/* Image with subtle zoom on hover */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl">
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover"
                            sizes="280px"
                            style={{
                              transform: hoveredIndex === i ? 'scale(1.07)' : 'scale(1)',
                              transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                              objectPosition: activity.imagePosition ?? 'center center',
                            }}
                          />
                        </div>
                        {/* Permanent bottom gradient */}
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        {/* Normal state: title at bottom */}
                        <div
                          className="relative z-10 flex flex-col justify-end h-full p-5"
                          style={{
                            opacity: hoveredIndex === i ? 0 : 1,
                            transition: 'opacity 0.25s ease',
                          }}
                        >
                          <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 ${accent.label}`}>
                            {activity.category}
                          </p>
                          <h3 className="text-base font-semibold text-white leading-tight">
                            {activity.title}
                          </h3>
                        </div>
                      </>
                    ) : (
                      /* ── Icon card (no photo) ── */
                      <div className="relative z-10 flex flex-col h-full p-6">
                        <div className={`w-11 h-11 rounded-xl ${accent.bg} flex items-center justify-center mb-5 shrink-0`}>
                          <Icon size={22} stroke={1.5} className={accent.text} />
                        </div>
                        <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${accent.text}`}>
                          {activity.category}
                        </p>
                        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                          {activity.title}
                        </h3>
                      </div>
                    )}

                    {/* Hover reveal overlay — transparent gradient so background shows through */}
                    <div
                      className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      style={{
                        transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <p
                        className={`text-[10px] font-semibold tracking-widest uppercase mb-1.5 ${accent.label}`}
                        style={{
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'opacity 0.35s 0.15s ease, transform 0.35s 0.15s ease',
                        }}
                      >
                        {activity.category}
                      </p>
                      <h3
                        className="text-base font-semibold text-white leading-tight mb-3"
                        style={{
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'opacity 0.35s 0.22s ease, transform 0.35s 0.22s ease',
                        }}
                      >
                        {activity.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed text-slate-300"
                        style={{
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'opacity 0.35s 0.30s ease, transform 0.35s 0.30s ease',
                        }}
                      >
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/40 dark:bg-white/10 text-white backdrop-blur-sm opacity-50 hover:opacity-95 transition-opacity duration-200"
            aria-label="Previous activity"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/40 dark:bg-white/10 text-white backdrop-blur-sm opacity-50 hover:opacity-95 transition-opacity duration-200"
            aria-label="Next activity"
          >
            <IconChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {ACTIVITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-5 h-2 bg-cyan-500'
                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to ${ACTIVITIES[i].title}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

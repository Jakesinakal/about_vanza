'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  bg: string; text: string; overlay: string; label: string;
}> = {
  cyan:    { bg: 'bg-cyan-500/10',    text: 'text-cyan-500',    overlay: 'bg-cyan-950/90',    label: 'text-cyan-400'    },
  violet:  { bg: 'bg-violet-500/10',  text: 'text-violet-500',  overlay: 'bg-violet-950/90',  label: 'text-violet-400'  },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-500',   overlay: 'bg-amber-950/90',   label: 'text-amber-400'   },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', overlay: 'bg-emerald-950/90', label: 'text-emerald-400' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-500',    overlay: 'bg-rose-950/90',    label: 'text-rose-400'    },
};

const COUNT        = ACTIVITIES.length;
const DEG          = 360 / COUNT;
const RADIUS       = 280;
const SENSITIVITY  = DEG / 300;
const HALF_LIFE    = 260;
const MIN_VEL      = 0.006;
const DRAG_MIN     = 6;

export default function Activities() {
  const discRef     = useRef<HTMLDivElement>(null);
  const angleRef    = useRef(0);
  const velocityRef = useRef(0);
  const suppressRef = useRef(false);
  const rafId       = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cancelMomentum = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const writeAngle = (angle: number, withTransition: boolean) => {
    if (!discRef.current) return;
    angleRef.current = angle;
    discRef.current.style.transition = withTransition
      ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
      : 'none';
    discRef.current.style.transform = `rotateY(${angle}deg)`;
  };

  const snapToNearest = useCallback(() => {
    const steps = Math.round(-angleRef.current / DEG);
    writeAngle(-steps * DEG, true);
    setActiveIndex(((steps % COUNT) + COUNT) % COUNT);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    cancelMomentum();
    const steps = Math.round(-angleRef.current / DEG) + dir;
    writeAngle(-steps * DEG, true);
    setActiveIndex(((steps % COUNT) + COUNT) % COUNT);
  }, []);

  const goTo = useCallback((target: number) => {
    cancelMomentum();
    const steps   = Math.round(-angleRef.current / DEG);
    const current = ((steps % COUNT) + COUNT) % COUNT;
    let   diff    = target - current;
    if (diff >  COUNT / 2) diff -= COUNT;
    if (diff < -COUNT / 2) diff += COUNT;
    writeAngle(-(steps + diff) * DEG, true);
    setActiveIndex(target);
  }, []);

  const launchMomentum = useCallback((initialVel: number) => {
    let vel    = initialVel;
    let lastTs = performance.now();

    const tick = (ts: number) => {
      const dt = Math.min(ts - lastTs, 50);
      lastTs   = ts;
      vel     *= Math.pow(0.5, dt / HALF_LIFE);
      writeAngle(angleRef.current + vel * dt, false);

      if (Math.abs(vel) > MIN_VEL) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = null;
        snapToNearest();
      }
    };

    rafId.current = requestAnimationFrame(tick);
  }, [snapToNearest]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button > 0) return;
    if ((e.target as HTMLElement).closest('[data-nav]')) return;

    cancelMomentum();
    velocityRef.current = 0;

    const startAngle = angleRef.current;
    const startX     = e.clientX;
    let   lastX      = e.clientX;
    let   lastT      = performance.now();
    let   dragged    = false;

    writeAngle(startAngle, false);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      const now = performance.now();
      const dt  = now - lastT;
      const dx  = ev.clientX - lastX;
      if (dt > 0) {
        velocityRef.current = 0.7 * velocityRef.current + 0.3 * ((dx * SENSITIVITY) / dt);
      }
      lastX = ev.clientX;
      lastT = now;
      const totalDx = ev.clientX - startX;
      if (Math.abs(totalDx) > DRAG_MIN) dragged = true;
      writeAngle(startAngle + totalDx * SENSITIVITY, false);
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup',     onUp);
      window.removeEventListener('pointercancel', onUp);
      if (dragged) {
        suppressRef.current = true;
        setTimeout(() => { suppressRef.current = false; }, 80);
      }
      if (Math.abs(velocityRef.current) > MIN_VEL) {
        launchMomentum(velocityRef.current);
      } else {
        snapToNearest();
      }
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup',     onUp);
    window.addEventListener('pointercancel', onUp);
  }, [launchMomentum, snapToNearest]);

  useEffect(() => cancelMomentum, []);

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
          className="relative select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1100px', height: '380px', touchAction: 'none' }}
          onPointerDown={onPointerDown}
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
                  onClick={() => { if (!suppressRef.current) goTo(i); }}
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
                  data-nav={i === activeIndex ? 'true' : undefined}
                  onMouseEnter={() => { if (i === activeIndex) setHoveredIndex(i); }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card base */}
                  <div className="relative w-full h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface dark:bg-midnight-soft overflow-hidden flex flex-col text-left">

                    {/* Normal state content */}
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

                    {/* Hover reveal overlay — only triggers on the active (front) card */}
                    <div
                      className={`absolute inset-0 z-20 flex flex-col justify-end p-6 ${accent.overlay}`}
                      style={{
                        transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1.5 ${accent.label}`}>
                        {activity.category}
                      </p>
                      <h3 className="text-base font-semibold text-white leading-tight mb-3">
                        {activity.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            data-nav="true"
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/40 dark:bg-white/10 text-white backdrop-blur-sm opacity-50 hover:opacity-95 transition-opacity duration-200"
            aria-label="Previous activity"
          >
            <IconChevronLeft size={20} />
          </button>
          <button
            data-nav="true"
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
              data-nav="true"
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

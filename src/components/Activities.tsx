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

const ACCENT: Record<Activity['accent'], { bg: string; text: string }> = {
  cyan:    { bg: 'bg-cyan-500/10',    text: 'text-cyan-500'    },
  violet:  { bg: 'bg-violet-500/10',  text: 'text-violet-500'  },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-500'   },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-500'    },
};

const COUNT        = ACTIVITIES.length; // 5
const DEG          = 360 / COUNT;       // 72° per step
const RADIUS       = 280;              // disc depth in px
const SENSITIVITY  = DEG / 300;        // deg per px dragged
const HALF_LIFE    = 260;              // ms — momentum deceleration half-life
const MIN_VEL      = 0.006;            // deg/ms — stop threshold for momentum
const DRAG_MIN     = 6;               // px — minimum move to count as drag

export default function Activities() {
  const discRef     = useRef<HTMLDivElement>(null);
  const angleRef    = useRef(0);          // continuous rotation (source of truth for disc)
  const velocityRef = useRef(0);          // deg/ms, smoothed during drag
  const suppressRef = useRef(false);      // suppress card clicks after a drag
  const rafId       = useRef<number | null>(null);

  // React state only for the dot-indicator UI
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Core helpers ─────────────────────────────────────────────────────────

  const cancelMomentum = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  // Write rotation to the disc DOM node directly — skip React for every frame.
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

  // ── Navigation (arrow buttons & dots) ────────────────────────────────────

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

  // ── Momentum animation ────────────────────────────────────────────────────

  const launchMomentum = useCallback((initialVel: number) => {
    let vel    = initialVel;
    let lastTs = performance.now();

    const tick = (ts: number) => {
      const dt = Math.min(ts - lastTs, 50); // cap at 50 ms (handles tab switches)
      lastTs   = ts;
      vel     *= Math.pow(0.5, dt / HALF_LIFE); // exponential decay
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

  // ── Drag start (pointer events) ──────────────────────────────────────────

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only left-button / primary touch; skip if clicking a nav control
    if (e.button > 0) return;
    if ((e.target as HTMLElement).closest('[data-nav]')) return;

    cancelMomentum();
    velocityRef.current = 0;

    const startAngle = angleRef.current;
    const startX     = e.clientX;
    let   lastX      = e.clientX;
    let   lastT      = performance.now();
    let   dragged    = false;

    writeAngle(startAngle, false); // kill any running CSS transition

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault(); // prevent scroll on touch/trackpad

      const now = performance.now();
      const dt  = now - lastT;
      const dx  = ev.clientX - lastX;

      if (dt > 0) {
        // Exponential-smoothed velocity: responsive but not noisy
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
        // Briefly suppress click events that fire right after pointerup
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

  // Cleanup rAF on unmount
  useEffect(() => cancelMomentum, []);

  // ── Render ────────────────────────────────────────────────────────────────

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
          {/* Zero-size pivot — rotates the whole disc */}
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
                >
                  <div className="w-full h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface dark:bg-midnight-soft p-6 flex flex-col text-left">
                    <div className={`w-11 h-11 rounded-xl ${accent.bg} flex items-center justify-center mb-5 shrink-0`}>
                      <Icon size={22} stroke={1.5} className={accent.text} />
                    </div>
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${accent.text}`}>
                      {activity.category}
                    </p>
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-tight mb-3">
                      {activity.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex-1">
                      {activity.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* data-nav prevents these from triggering a drag start */}
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

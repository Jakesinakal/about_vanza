'use client';

import Image from 'next/image';
import { IconMapPin } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Star, CurvedArrow, Squiggle } from './ui/SketchElements';
import { PERSONAL_INFO, MOTIVATION_CARDS } from '@/lib/constants';

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div
              {...fadeUp(0.1)}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase"
            >
              <IconMapPin size={14} stroke={2} className="text-cyan-500" />
              {PERSONAL_INFO.location}
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-[2.75rem] lg:text-[3.25rem] font-semibold leading-[1.15] tracking-tight text-slate-800 dark:text-slate-100"
            >
              Hello, I&apos;m{' '}
              <span className="text-cyan-500">{PERSONAL_INFO.name}.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              I am a{' '}
              <span className="font-semibold text-cyan-500">Nuclear Engineer</span>{' '}
              interested and transitioning into{' '}
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                Data Infrastructure
              </span>
              .
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="relative">
              <p className="text-base leading-[1.8] text-slate-600 dark:text-slate-400 max-w-lg">
                From nuclear engineering to data systems, I apply rigorous problem-solving
                to design scalable pipelines, architect ETL/ELT workflows, and build
                full-stack applications that turn raw data into real insight.
              </p>
              <Squiggle className="absolute -bottom-5 left-0 w-16 h-3 text-cyan-500/40" />
            </motion.div>

          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Photo + decorations */}
            <div className="relative">
              <div className="relative w-56 h-56 lg:w-64 lg:h-64 bg-surface dark:bg-midnight-soft border border-slate-200 dark:border-slate-800 overflow-hidden" style={{ borderRadius: '1.25rem' }}>
                <Image src="/photo.jpg" fill alt={PERSONAL_INFO.fullName} className="object-cover" />
              </div>

              <Star className="absolute -top-4 -right-4 w-7 h-7 text-cyan-500" />
              <Star className="absolute bottom-4 -left-5 w-5 h-5 text-violet-600 dark:text-violet-400" />
              <Star className="absolute top-1/2 -right-7 w-4 h-4 text-slate-400 dark:text-slate-600" />
              <CurvedArrow className="absolute -bottom-8 right-0 w-12 h-8 text-slate-400 dark:text-slate-600 rotate-12" />
            </div>

            {/* Motivation cards */}
            {MOTIVATION_CARDS.map((card) => (
              <div
                key={card.id}
                className={`${card.rotation} w-full max-w-xs bg-surface dark:bg-midnight-soft border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:rotate-0 transition-transform duration-300`}
              >
                <p className="text-[10px] font-semibold tracking-widest uppercase text-cyan-500 mb-2">
                  {card.label}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {card.content}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

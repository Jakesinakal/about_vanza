'use client';

import { motion } from 'framer-motion';
import { Star } from './ui/SketchElements';
import { PERSONAL_INFO } from '@/lib/constants';

const GOALS = [
  { label: 'Industry-Ready Skills', description: 'Closing the gap between self-taught and production-grade by building real projects that reflect how data systems actually work in professional environments.' },
  { label: 'Depth Over Breadth', description: 'Going beyond surface-level familiarity with tools. Understanding pipelines, ETL workflows, and data infrastructure well enough to own them end to end.' },
  { label: 'Prove It Through Projects', description: 'Every project is a step toward demonstrating competence, not just claiming it. Shipping real work is the only benchmark that matters.' },
];

export default function About() {
  return (
    <section id="about" className="py-32 border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-start">

          {/* Left: bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">
                About
              </p>
              <h2 className="text-[2rem] font-semibold tracking-tight text-slate-800 dark:text-slate-100 leading-tight mb-8">
                About Me
              </h2>
            </motion.div>

            <div className="flex flex-col gap-5">
              {PERSONAL_INFO.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="text-base leading-[1.8] text-slate-600 dark:text-slate-400"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right: values */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-1"
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-5">
              Where I&apos;m Heading
            </p>

            {GOALS.map((goal, i) => (
              <div
                key={goal.label}
                className="flex flex-col gap-1.5 py-5 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <Star className={`w-3 h-3 ${i === 0 ? 'text-cyan-500' : i === 1 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`} />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {goal.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 pl-5">
                  {goal.description}
                </p>
              </div>
            ))}

            {/* Location tag */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                Based in
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface dark:bg-midnight border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                {PERSONAL_INFO.location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

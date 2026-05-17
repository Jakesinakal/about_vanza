'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink, IconArrowUpRight } from '@tabler/icons-react';
import { PROJECTS } from '@/lib/constants';
import WeatherOverlay from '@/components/WeatherOverlay';

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-lg">
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">
              Projects
            </p>
            <h2 className="text-[2rem] font-semibold tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
              Selected Work
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            A selection of data engineering and full-stack projects — built for scale, clarity,
            and real-world impact.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              className="group relative flex flex-col bg-surface dark:bg-midnight-soft border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-300"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Color band / image area */}
              <div
                className={`${project.color} h-48 relative flex items-center justify-center border-b border-slate-200 dark:border-slate-800 overflow-hidden`}
              >
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {project.weatherOverlay && <WeatherOverlay active={hoveredId === project.id} />}
                  </>
                ) : (
                  <span className="text-4xl font-black text-slate-200 dark:text-slate-700 select-none tracking-tighter">
                    {project.id.padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    {project.title}
                  </h3>
                  {project.metric && (
                    <span className="shrink-0 text-[10px] font-semibold tracking-wider uppercase text-cyan-500 bg-cyan-500/10 rounded px-2 py-1">
                      {project.metric}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200"
                    >
                      <IconBrandGithub size={15} stroke={2} />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors duration-200"
                    >
                      <IconExternalLink size={15} stroke={2} />
                      Live Demo
                    </a>
                  )}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <IconArrowUpRight size={16} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

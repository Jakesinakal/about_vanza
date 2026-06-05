'use client';

import { motion } from 'framer-motion';
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconArrowRight,
} from '@tabler/icons-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { Star } from './ui/SketchElements';

const LINKS = [
  {
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: IconMail,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin/VanZa',
    href: PERSONAL_INFO.linkedin,
    icon: IconBrandLinkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/Jakesinakal',
    href: PERSONAL_INFO.github,
    icon: IconBrandGithub,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-surface dark:bg-midnight-soft">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-cyan-500" />
              <p className="text-xs font-semibold tracking-widest uppercase text-cyan-500">
                Find Me
              </p>
            </div>
            <h2 className="text-[2rem] font-semibold tracking-tight text-slate-800 dark:text-slate-100 leading-tight mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-base leading-[1.8] text-slate-500 dark:text-slate-400 mb-12">
              Open to interesting roles, collaborations, and conversations. Whether it&apos;s a
              data infrastructure challenge or a product you&apos;re building, I&apos;d love to
              hear about it.
            </p>
          </motion.div>

          {/* Contact links */}
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.08,
                  }}
                  className="group flex items-center justify-between py-5 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-cream dark:bg-midnight border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500/40 transition-colors duration-200">
                      <Icon size={17} stroke={2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-0.5">
                        {link.label}
                      </p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 transition-colors duration-200">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <IconArrowRight
                    size={16}
                    stroke={2}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transition-transform"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

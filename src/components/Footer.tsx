'use client';

import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 dark:border-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {year} {PERSONAL_INFO.fullName}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <IconBrandGithub size={17} stroke={2} />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <IconBrandLinkedin size={17} stroke={2} />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <IconMail size={17} stroke={2} />
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-200"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

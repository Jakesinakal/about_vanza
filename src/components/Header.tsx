'use client';

import { useState, useEffect } from 'react';
import { IconSun, IconMoon, IconMenu2, IconX } from '@tabler/icons-react';
import { useTheme } from './ThemeProvider';
import { NAV_LINKS, PERSONAL_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Order matters: first entry in this list wins when multiple sections overlap.
    const sectionIds = ['hero', 'activities', 'projects', 'about', 'contact'];
    const visible = new Set<string>();

    const pick = () => {
      const active = sectionIds.find((id) => visible.has(id));
      if (active) setActiveSection(active);
    };

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
          pick();
        },
        // Detection band: 20%–50% from the top of the viewport.
        { rootMargin: '-20% 0px -50% 0px' },
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream/90 dark:bg-midnight/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-base font-semibold text-slate-800 dark:text-slate-100 tracking-tight hover:text-cyan-500 transition-colors duration-200"
          aria-label="Scroll to top"
        >
          {PERSONAL_INFO.name}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'relative text-xs font-semibold tracking-widest transition-colors duration-200 pb-0.5',
                  isActive
                    ? 'text-slate-800 dark:text-slate-100 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:rounded-full'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100',
                )}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
<button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <IconSun size={16} stroke={2} /> : <IconMoon size={16} stroke={2} />}
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded text-slate-600 dark:text-slate-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream dark:bg-midnight border-t border-slate-200 dark:border-slate-800 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm font-semibold tracking-widest text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

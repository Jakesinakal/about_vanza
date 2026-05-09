import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function Star({ className }: Props) {
  return (
    <svg
      className={cn('shrink-0', className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CurvedArrow({ className }: Props) {
  return (
    <svg
      className={cn('shrink-0', className)}
      viewBox="0 0 56 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 18 C14 4 40 4 50 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M44 12 L50 18 L44 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className }: Props) {
  return (
    <svg
      className={cn('shrink-0', className)}
      viewBox="0 0 80 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C12 2 20 14 30 8 C40 2 48 14 58 8 C68 2 76 14 78 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Dots({ className }: Props) {
  return (
    <svg
      className={cn('shrink-0', className)}
      viewBox="0 0 40 10"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="5" cy="5" r="2.5" fill="currentColor" />
      <circle cx="20" cy="5" r="2.5" fill="currentColor" />
      <circle cx="35" cy="5" r="2.5" fill="currentColor" />
    </svg>
  );
}

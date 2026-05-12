import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PERSONAL_INFO } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.fullName} — Data Engineer & Full-Stack Developer`,
  description: `Portfolio of ${PERSONAL_INFO.fullName}, a Data Engineer and Full-Stack Developer based in ${PERSONAL_INFO.location}. Building scalable data pipelines and full-stack applications.`,
  keywords: [
    'Data Engineer',
    'Full-Stack Developer',
    'Python',
    'React',
    'SQL',
    'ETL',
    'BigQuery',
    PERSONAL_INFO.location,
  ],
  authors: [{ name: PERSONAL_INFO.fullName }],
  openGraph: {
    title: `${PERSONAL_INFO.fullName} — Data Engineer & Full-Stack Developer`,
    description: `Portfolio of ${PERSONAL_INFO.fullName}. Building scalable data pipelines and full-stack applications.`,
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Prevent theme flash on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-cream dark:bg-midnight text-slate-800 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

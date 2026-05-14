import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ACTIVITIES } from '@/lib/constants';
import { IconArrowLeft, IconQuote } from '@tabler/icons-react';

export function generateStaticParams() {
  return ACTIVITIES.filter((a) => !a.comingSoon).map((a) => ({ slug: a.slug }));
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = ACTIVITIES.find((a) => a.slug === slug && !a.comingSoon);
  if (!activity) notFound();

  return (
    <main className="min-h-screen bg-cream dark:bg-midnight text-slate-800 dark:text-slate-100">

      {/* Hero */}
      <div className="relative h-72 sm:h-[28rem] w-full overflow-hidden">
        {activity.video ? (
          <video
            src={activity.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : activity.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activity.image}
            alt={activity.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Link
          href="/#activities"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <IconArrowLeft size={18} />
          Back
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
            {activity.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
            {activity.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Lead */}
        <p className="text-lg leading-[1.9] text-slate-600 dark:text-slate-300 mb-16 font-medium">
          {activity.description}
        </p>

        {/* Sections */}
        {activity.sections && activity.sections.length > 0 ? (
          <div className="space-y-14">
            {activity.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-base leading-[1.9] text-slate-600 dark:text-slate-400">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-800 w-full" />
            <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-800 w-5/6" />
            <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-800 w-4/6" />
            <p className="mt-10 text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-600">
              Coming soon
            </p>
          </div>
        )}

        {/* Quote */}
        {activity.quote && (
          <div className="mt-16 relative pl-6 border-l-2 border-cyan-500">
            <IconQuote size={28} className="text-cyan-500/40 mb-3" />
            <blockquote className="text-lg leading-[1.8] text-slate-700 dark:text-slate-300 italic">
              {activity.quote}
            </blockquote>
          </div>
        )}

      </div>
    </main>
  );
}

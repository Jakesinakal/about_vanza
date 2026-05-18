import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';
import { IconArrowLeft, IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-cream dark:bg-midnight text-slate-800 dark:text-slate-100">

      {/* Hero */}
      <div className={`relative h-72 sm:h-[36rem] w-full overflow-hidden ${project.color}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12rem] font-black text-slate-200/40 dark:text-slate-700/40 select-none tracking-tighter">
              {project.id.padStart(2, '0')}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Link
          href="/#projects"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <IconArrowLeft size={18} />
          Back
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
              Project
            </p>
            {project.metric && (
              <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-300 bg-cyan-500/20 backdrop-blur-sm rounded px-2 py-1">
                {project.metric}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Lead */}
        <p className="text-lg leading-[1.9] text-slate-600 dark:text-slate-300 mb-10 font-medium">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Story sections */}
        {project.story && project.story.length > 0 ? (
          <div className="space-y-14">
            {project.story.map((section, i) => (
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
                {section.image && (
                  <div className="relative mt-6 rounded-xl overflow-hidden aspect-video">
                    <Image src={section.image} alt="" fill className="object-cover" />
                  </div>
                )}
                {section.video && (
                  <div className="mt-6 rounded-xl overflow-hidden">
                    <video
                      src={section.video}
                      controls
                      playsInline
                      className="w-full rounded-xl"
                    />
                  </div>
                )}
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

        {/* Links */}
        {(project.github || project.demo) && (
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <IconBrandGithub size={18} stroke={2} />
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
              >
                <IconExternalLink size={18} stroke={2} />
                Live Demo
              </a>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

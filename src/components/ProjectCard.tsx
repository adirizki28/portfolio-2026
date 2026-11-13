import type { Project } from '../data/Project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card sticky top-70 md:static bg-white/5 backdrop-blur-md border border-neutral-200 rounded-3xl p-4 z-20 transition-transform duration-300">
      <div className="overflow-hidden rounded-2xl bg-neutral-100 aspect-4/3">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-neutral-900 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">{project.category}</p>
        </div>
        <a
          href={project.link}
          aria-label={`View ${project.title}`}
          className="shrink-0 w-11 h-11 rounded-xl bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M7 7h10v10"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
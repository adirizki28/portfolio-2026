import type { Project } from "../data/Project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <div
      style={{
        top: `${185 + index * 4}px`,
        zIndex: 20 + index,
      }}
      className="max-md:sticky md:static overflow-hidden bg-white/5 backdrop-blur-lg rounded-3xl border border-neutral-200 p-3.5 md:p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:shadow-none transition-all duration-300"
    >
      {/* Wrapper Gambar */}
      <div className="overflow-hidden rounded-2xl bg-neutral-100 aspect-4/3">
        <img
          src={project.image || project.image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Project & Tombol */}
      <div className="mt-3.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-clash text-lg md:text-xl font-medium text-neutral-900 truncate">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-neutral-500 mt-0.5 truncate">
            {project.category}
          </p>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Lihat proyek ${project.title}`}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}
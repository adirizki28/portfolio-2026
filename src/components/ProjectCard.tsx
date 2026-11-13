import type { Project } from "../data/Project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  // Jarak tumpukan antar-card tepat 4px (170px -> 174px -> 178px -> dst.)
  const stickyTop = 170 + index * 1;

  return (
    <div
      style={{
        top: `${stickyTop}px`,
        zIndex: 20 + index,
      }}
      className="max-md:sticky md:static bg-white rounded-3xl border border-neutral-200/90 p-3.5 md:p-4 shadow-[0_-4px_14px_rgba(0,0,0,0.06)] md:shadow-none transition-all duration-300"
    >
      {/* Wrapper Gambar dengan rasio tetap agar tinggi semua card identik */}
      <div className="overflow-hidden rounded-2xl bg-neutral-100 aspect-[4/3]">
        <img
          src={project.image || project.image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Project */}
      <div className="mt-3.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {/* line-clamp-1 menjaga tinggi teks tetap 1 baris agar tepi bawah tidak meluber */}
          <h3 className="font-clash text-lg md:text-xl font-medium text-neutral-900 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-neutral-500 mt-0.5 line-clamp-1">
            {project.category}
          </p>
        </div>

        {/* Tombol panah */}
        <a href="/" className='p-4 rounded-[8px] bg-orange-500 text-white'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right preview-icon"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>

        </a>
      </div>
    </div>
  );
}

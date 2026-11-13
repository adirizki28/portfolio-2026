import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../data/Project';
import ProjectCard from './ProjectCard';

export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchFeaturedProjects();
  }, []);

  return (
    <section id="projects" className="px-4 pt-16 pb-48 md:pb-16 mx-auto max-w-7xl">
      {/* 1. HEADER SECTION */}
      <div className="sticky top-20 md:static bg-white/95 backdrop-blur-sm pb-6 pt-2 z-10 text-center max-w-xl mx-auto">
        <h2 className="font-clash text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-[1.05]">
          Featured
          <br className="md:hidden" /> Works
        </h2>
        <p className="mt-3 text-neutral-600 leading-relaxed">
          A selection of UI/UX and visual design projects, shaped by thoughtful ideas, clear
          communication, and attention to detail.
        </p>
      </div>

      {/* 2. CONTAINER CARDS */}
      {loading ? (
        <div className="text-center py-12 text-neutral-500 text-sm">
          Memuat karya...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 text-sm">
          Belum ada proyek yang ditampilkan.
        </div>
      ) : (
        <div className="relative flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 mt-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
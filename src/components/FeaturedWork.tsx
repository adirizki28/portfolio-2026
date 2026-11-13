import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project } from "../data/Project";
import ProjectCard from "./ProjectCard";
import BlurText from "./BlurText";

export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchFeaturedProjects();
  }, []);

  return (
    <section
      id="projects"
      className="px-4 pt-16 pb-48 md:pb-16 mx-auto max-w-7xl"
    >
      {/* 1. HEADER SECTION */}
      <div className="sticky top-18 md:static bg-white/95 backdrop-blur-sm py-2 z-10 text-center max-w-xl mx-auto">
        <BlurText
            text="Featured Works"
            delay={60}
            animateBy="words"
            direction="bottom"
            className="flex justify-center font-clash text-center mx-auto text-4xl md:text-5xl font-medium tracking-tight leading-[85%] text-neutral-900"/>

        <p className="text-neutral-600 leading-relaxed pb-4">
          A selection of UI/UX and visual design projects.
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
        <div className="relative flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 mt-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} index={0} />
          ))}
        </div>
      )}
    </section>
  );
}

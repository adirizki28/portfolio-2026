import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Project } from "../data/Project";
import ProjectCard from "./ProjectCard";
import BlurText from "./BlurText";
import { Link } from "react-router-dom";

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
      className="px-4 pt-16 pb-32 md:pb-16 mx-auto max-w-7xl"
    >
      {/* 1. HEADER SECTION */}
      <div className="sticky top-22 md:static bg-white/95 backdrop-blur-sm py-2 z-10 text-center max-w-xl mx-auto">
        <BlurText
          text="Featured Works"
          delay={60}
          animateBy="words"
          direction="bottom"
          className="flex justify-center font-clash text-center mx-auto text-4xl md:text-5xl font-medium tracking-tight leading-[85%] text-neutral-900"
        />
        <p className="mt-2.5 text-neutral-600 leading-relaxed">
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
        <><div className="relative flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 mt-4">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}

              {/* Spacer transparan khusus mobile agar card terakhir bisa naik penuh menutup card sebelumnya */}
              <div className="h-75 md:hidden" aria-hidden="true" />
            </div><div className="mt-8 md:mt-12 flex justify-center">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
                >
                  <span>View All Projects</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div></>

      )}
    </section>
  );
}
import NavBar from "@/components/NavBar";
import { projects } from "@/data/projects";
import Projects from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Floating Nav */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <NavBar />
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-6 py-24 pl-28">
        <Projects projects={projects} />
      </div>
    </main>
  );
}


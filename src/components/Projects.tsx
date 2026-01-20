import { CardGrid } from "@/components/CardGrid";
import { Project } from "@/types/project";

export default function Projects({ projects, limit }: { projects: Project[]; limit?: number }) {
  return (
    <section id="projects" className="w-full">
      <h2 className="text-4xl mt-8 font-bold">Projects</h2>
      <CardGrid projects={projects} limit={limit} />
    </section>
  );
}

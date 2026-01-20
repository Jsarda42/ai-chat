"use client";
import Link from "next/link";
import { CardProps, CardGridProps } from "@/types/Card";
import { useState } from "react";
import ProjectOverlay from "@/components/ProjectOverlay";
import Calculator  from "@/components/Calculator";


function Card({ title, img, description, url, tags, slug, onClick }: CardProps) {
  const isExternal = url?.startsWith("http");

  const card = (
    <div
      onClick={onClick}
      className="
        rounded-xl
        border border-white/10
        bg-zinc-900
        p-5
        transition
        hover:border-white/30
        hover:-translate-y-1
        cursor-pointer
      "
    >
      <img
        src={img}
        alt={title}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />

      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-zinc-300">{description}</p>

      {tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  // External link
  if (url) {
    return (
      <Link
        href={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block"
      >
        {card}
      </Link>
    );
  }

  // Internal page (non-calculator projects)
  if (slug && !onClick) {
    return (
      <Link href={`/${slug}`} className="block">
        {card}
      </Link>
    );
  }

  // Inline project (calculator)
  return card;
}

export function CardGrid({ projects, limit }: CardGridProps) {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const visibleProjects = limit
    ? projects.slice(0, limit)
    : projects;

  return (
    <>
      <div
        className="
          mt-6
          grid
          gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {visibleProjects.map((project, index) => (
          <Card
            key={index}
            {...project}
            onClick={
              project.slug === "calculator"
                ? () => setOpenProject("calculator")
                : undefined
            }
          />
        ))}
      </div>

      {openProject === "calculator" && (
        <ProjectOverlay onClose={() => setOpenProject(null)}>
          <Calculator />
        </ProjectOverlay>
      )}
    </>
  );
}






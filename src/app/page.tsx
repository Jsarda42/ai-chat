"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experiences from "@/components/Experiences";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import Link from "next/link";
import Contact from "@/components/Contact";

function PageContent() {
  return (
    <>
      <section id="home" className="scroll-mt-24">
        <h1 className="text-4xl mb-8 font-bold">Julien Sarda</h1>
        <p>
          Frontend developer with a strong software engineering foundation from
          42 Paris and OpenClassrooms, currently working as a freelance developer
          in Korea.
        </p>
      </section>

      <section id="experiences" className="scroll-mt-24">
        <Experiences experiences={experiences} />
      </section>

      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>

      <section id="projects" className="scroll-mt-24">
        <Projects projects={projects} limit={2} />
        <Link
          href="/projects"
          className="
            group mt-6 flex items-center gap-2
            text-zinc-400 hover:text-white transition w-fit
          "
        >
          <span className="text-sm font-medium">See more</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>

      <section id="contact" className="scroll-mt-24">
        <Contact />
      </section>
    </>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* MOBILE NAV TOGGLE */}
      <button
        onClick={() => setNavOpen((o) => !o)}
        className="
          md:hidden fixed top-4 left-4 z-50
          w-12 h-12 rounded-full
          bg-zinc-900 border border-white/10
          flex items-center justify-center
        "
      >
        ☰
      </button>

      {/* MOBILE NAV OVERLAY */}
      {navOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setNavOpen(false)}
        >
          <div
            className="absolute top-20 left-4"
            onClick={(e) => e.stopPropagation()}
          >
            <NavBar onNavigate={() => setNavOpen(false)} />
          </div>
        </div>
      )}

      {/* LAYOUT */}
      <div className="flex min-h-screen">
        {/* DESKTOP NAV */}
        <aside className="hidden md:flex w-30 sticky top-0 h-screen items-center justify-center">
          <NavBar />
        </aside>

        {/* CONTENT (ONE TIME ONLY) */}
        <main className="flex-1 px-6 py-24">
          <PageContent />
        </main>
      </div>
    </div>
  );
}

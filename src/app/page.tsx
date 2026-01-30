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

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* MOBILE NAV TOGGLE */}
      <button
        onClick={() => setNavOpen(o => !o)}
        className="
          md:hidden
          fixed top-4 left-4 z-50
          w-12 h-12
          rounded-full
          bg-zinc-900
          border border-white/10
          shadow-lg
          flex items-center justify-center
        "
      >
        ☰
      </button>

      {/* MOBILE NAV OVERLAY */}
      {navOpen && (
        <div
          className="
            md:hidden
            fixed inset-0 z-40
            bg-black/60
            backdrop-blur-sm
          "
          onClick={() => setNavOpen(false)}
        >
          <div
            className="absolute top-20 left-4"
            onClick={e => e.stopPropagation()}
          >
            <NavBar />
          </div>
        </div>
      )}

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex min-h-screen">

        {/* LEFT NAV */}
        <aside
          className="
            w-30
            shrink-0
            sticky top-0
            h-screen
            flex items-center justify-center
          "
        >
          <NavBar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-6 py-24">
          <section id="home" className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl mb-8 font-bold">Julien Sarda</h1>
              <p>
                Frontend developer with a strong software engineering foundation from 42 Paris and
                OpenClassrooms, currently working as a freelance developer on a commercial e-commerce project
                in Korea.
              </p>
            </div>
          </section>

          <Experiences experiences={experiences} />
          <Skills />

          <div className="w-full">
            <Projects projects={projects} limit={2} />

            <Link
              href="/projects"
              className="
      group
      mt-6
      flex items-center gap-2
      text-zinc-400
      hover:text-white
      transition
      cursor-pointer
      w-fit
    "
            >
              <span className="text-sm font-medium">See more</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <Contact />
        </main>
      </div>

      {/* MOBILE CONTENT (no sidebar!) */}
      <main className="md:hidden px-6 py-24">
        <section id="home">
          <h1 className="text-4xl mb-8 font-bold">Julien Sarda</h1>
          <p>Frontend developer with a strong software engineering foundation…</p>
        </section>

        <Experiences experiences={experiences} />
        <Skills />
        <Projects projects={projects} limit={2} />
        <div className="w-full">
  <Projects projects={projects} limit={2} />

  <Link
    href="/projects"
    className="
      group
      mt-6
      flex items-center gap-2
      text-zinc-400
      hover:text-white
      transition
      cursor-pointer
      w-fit
    "
  >
    <span className="text-sm font-medium">See more</span>
    <span className="transition-transform group-hover:translate-x-1">→</span>
  </Link>
</div>
        <Contact />
      </main>
    </div>
  );
}

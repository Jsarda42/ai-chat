"use client";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experiences from "@/components/Experiences";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import Link from "next/link";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex bg-black text-white">

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

        {/* PROFILE INFO */}
        <section id="home" className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl mb-8 font-bold">Julien Sarda</h1>
            <p className="">
              Frontend developer with a strong software engineering foundation from 42 Paris and
              OpenClassrooms, currently working as a freelance developer on a commercial e-commerce project
              in Korea. Experienced in building user-focused applications with React and JavaScript. Reliable,
              autonomous, and comfortable in international environments.
            </p>
          </div>
        </section>

        {/* EXPERIENCES*/}
        <Experiences experiences={experiences} />

        {/* SKILLS */}
        <Skills />

        {/* PROJECTS */}
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

        {/* CONTACT */}
       <Contact/>
      </main>
    </div>
  );
}






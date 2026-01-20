import { Project } from "@/types/project";

export const projects: Project[] = [
{
    title: "Mconscience",
    img: "/assets/mconscience.webp",
    description: "Freelance project for a sustainable lifestyle startup.",
    url: "https://mconscience.fr",
    tags: ["React", "Tailwind CSS"],
  },
  {
    title: "42 Projects",
    description: "Collection of projects completed during the 42 Paris curriculum.",
    url: "https://github.com/Jsarda42/42Cursus",
    img: "/assets/42logo.webp",
    tags: ["C", "C++", "Algorithms"],
  },
  {
    title: "WASM Calculator",
    img: "/assets/calculator.webp",
    description: "C calculator compiled to WebAssembly.",
    slug: "calculator",
    tags: ["C", "WebAssembly", "Emscripten"]
  },
];
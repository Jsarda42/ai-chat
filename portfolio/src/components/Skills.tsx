import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiFigma,
    SiFirebase,
    SiDocker,
    SiLinux,
    SiApple,
    SiHtml5,
    SiCss3,
    SiC,
    SiCplusplus
} from "react-icons/si";


const skills = [
    // Frontend
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiTailwindcss, name: "Tailwind CSS", color: "#38BDF8" },
    { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
    { icon: SiCss3, name: "CSS3", color: "#1572B6" },

    // Backend / Tools
    { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
    { icon: SiDocker, name: "Docker", color: "#2496ED" },

    // Systems
    { icon: SiLinux, name: "Linux", color: "#FCC624" },
    { icon: SiApple, name: "macOS", color: "#ffffff" },

    // Languages
    { icon: SiC, name: "C", color: "#A8B9CC" },
    { icon: SiCplusplus, name: "C++", color: "#00599C" },

    // Design
    { icon: SiFigma, name: "Figma", color: "#F24E1E" }
];


export default function Skills() {
    return (
        <section id="skills" className="mt-8">
            <h2 className="text-4xl font-bold mb-6">Skills</h2>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
                {skills.map(({ icon: Icon, name, color }) => (
                    <div
                        key={name}
                        className="
              group
              flex items-center justify-center
              rounded-xl
              border border-white/10
              bg-zinc-900
              p-4
              transition
              hover:border-white/30
              hover:scale-105
              cursor-pointer
            "
                    >
                        <Icon
                            className="
                text-3xl
                text-zinc-400
                transition
                group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]
              "
                            style={{ color }}
                            title={name}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}


import { Experience } from "@/types/Experience";

export default function Experiences({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experiences" className="mt-8">
      <h2 className="text-4xl font-bold mb-6">Experiences</h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="
              rounded-xl
              border border-white/10
              bg-zinc-900
              p-6
              transition
              hover:border-white/30
            "
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-zinc-400">{exp.company}</p>
              </div>
              <span className="text-sm text-zinc-500">{exp.period}</span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

export default function Contact() {
  return (
    <section id="contact" className="mt-24">
      <h2 className="text-4xl font-bold mb-8">Contact</h2>

      <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950">
        <p className="text-zinc-400 mb-6">
          Interested in working together or have a question?  
          Feel free to reach out.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-zinc-300">
          <a
            href="mailto:julien.sarda@icloud.com"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="text-lg">📧</span>
            <span>julien.sarda@icloud.com</span>
          </a>

          <a
            href="https://github.com/Jsarda42"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="text-lg">🧑‍💻</span>
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/julien-sarda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="text-lg">💼</span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const itemsTop = [
    { icon: "🏠", target: "home" },
    { icon: "📐", target: "experiences" },
    { icon: "🎨", target: "skills" },
    { icon: "📷", target: "projects" },
  ];

  const itemsBottom = [
    { icon: "🌐", target: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  const handleSectionNav = (id: string) => {
    if (pathname === "/") {
      // already on home → smooth scroll
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      // navigate back to home + section
      router.push(`/#${id}`);
    }
  };

  return (
    <nav
      className="
        relative
        flex flex-col items-center gap-2
        px-2 py-2
        rounded-[48px]
        cursor-pointer
        bg-linear-to-b
        from-[#2a2b30]
        via-[#15161a]
        to-[#09090b]
        border border-white/10
        shadow-[0_0_1px_rgba(255,255,255,0.35),0_40px_80px_rgba(0,0,0,0.9)]
      "
    >
      {/* TOP ITEMS */}
      {itemsTop.map((item, i) => (
        <button
          key={i}
          onClick={() => handleSectionNav(item.target)}
          className="relative group flex items-center justify-center w-full h-16"
          aria-label={`Go to ${item.target}`}
        >
          {/* Hover circle */}
          <span
            className="
              absolute
              w-12 h-12
              rounded-full
              bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0.12)_35%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.7)_100%)]
              shadow-[0_0_35px_rgba(255,255,255,0.12)]
              opacity-0
              scale-95
              transition-all duration-200 ease-out
              group-hover:opacity-100
              group-hover:scale-100
            "
          />
          <span className="relative z-10 text-2xl text-zinc-300">
            {item.icon}
          </span>
        </button>
      ))}

      {/* SEPARATOR */}
      <div className="w-10 h-px bg-white/25 my-2" />

      {/* BOTTOM ITEMS */}
      {itemsBottom.map((item, i) => (
        <button
          key={i}
          onClick={() => handleSectionNav(item.target)}
          className="relative group flex items-center justify-center w-full h-16"
          aria-label={`Go to ${item.target}`}
        >
          <span
            className="
              absolute
              w-12 h-12
              rounded-full
              bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0.12)_35%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.7)_100%)]
              shadow-[0_0_35px_rgba(255,255,255,0.12)]
              opacity-0
              scale-95
              transition-all duration-200 ease-out
              group-hover:opacity-100
              group-hover:scale-100
            "
          />
          <span className="relative z-10 text-2xl text-zinc-300">
            {item.icon}
          </span>
        </button>
      ))}
    </nav>
  );
}

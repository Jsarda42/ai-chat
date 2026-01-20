"use client";

export default function ProjectOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-10 right-6 text-zinc-400 hover:text-white text-2xl cursor-pointer"
      >
        ✕
      </button>

      <div className="w-full max-w-4xl p-6">
        {children}
      </div>
    </div>
  );
}

"use client";

import { DecisionTrace } from "@/aiV2/utils/DecisionTrace";
import { TraceViewer } from "@/components/TraceViewer";

type Props = {
  trace: DecisionTrace | null;
  open: boolean;
  onClose: () => void;
};

export function TraceDrawer({ trace, open, onClose }: Props) {
  if (!trace) return null;

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-full sm:w-[420px]
        bg-zinc-950 border-l border-zinc-800
        transform transition-transform duration-300
        z-50
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="font-semibold text-white">🧠 Decision Trace</span>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-48px)] overflow-y-auto p-4">
        {/* reuse your existing viewer */}
       <TraceViewer trace={trace}/>
      </div>
    </div>
  );
}

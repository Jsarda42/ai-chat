"use client";

import { useState } from "react";
import { DecisionTrace } from "../aiV2/utils/DecisionTrace";
import { TraceViewer } from "./TraceViewer";

export function TracePanel({ trace }: { trace: DecisionTrace | null }) {
  const [open, setOpen] = useState(false);

  if (!trace) return null;

  return (
    <div className="border-t border-zinc-800 bg-zinc-950">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 flex justify-between"
      >
        <span>🧠 Decision Trace</span>
        <span className="opacity-60">{open ? "▼" : "▲"}</span>
      </button>

      {open && (
        <div className="max-h-60 overflow-y-auto p-4">
          <TraceViewer trace={trace} />
        </div>
      )}
    </div>
  );
}

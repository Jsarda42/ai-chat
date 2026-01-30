"use client";

import { SUGGESTED_QUESTIONS } from "../ui/suggesedQuestions";

type Props = {
  onSelect: (question: string) => void;
};

export function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="px-3 py-2 border-b border-zinc-800 bg-zinc-950">
      <div className="text-xs text-zinc-400 mb-2">
        💡 Try asking:
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="
              text-xs
              px-3 py-1
              rounded-full
              bg-zinc-800
              hover:bg-zinc-700
              text-zinc-200
              transition
            "
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

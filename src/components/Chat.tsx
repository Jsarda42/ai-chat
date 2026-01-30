"use client";

import { useState, useRef, useEffect } from "react";
import { DecisionTrace } from "@/aiV2/utils/DecisionTrace";
import { KnowledgeType } from "@/aiV2/types/knowledgeType";
import { SuggestedQuestions } from "@/aiV2/components/SuggestedQuestions";
import { TraceDrawer } from "@/aiV2/components/TraceDrawer";

type Message = {
  text: string;
  role: "user" | "ai";
  kind?: string;
  entity?: string | null;
  attribute?: string | null;
  teachNeeded?: boolean;
  taught?: boolean;
  knowledgeType?: KnowledgeType;
};

export default function ChatWidget() {
  const [input, setInput] = useState("");
  const [teachValue, setTeachValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [trace, setTrace] = useState<DecisionTrace | null>(null);
  const [traceOpen, setTraceOpen] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ======================
  // SEND MESSAGE
  // ======================
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, role: "user" }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();

    setTrace(data.trace ?? null);

    setMessages(prev => [
      ...prev,
      {
        text: data.response ?? "(I don't know yet)",
        role: "ai",
        kind: data.kind,
        entity: data.entity,
        attribute: data.attribute,
        teachNeeded: data.teachNeeded,
        knowledgeType: data.trace?.outcome?.teachingExpectation?.knowledgeType,
      },
    ]);

    setInput("");
  };

  // ======================
  // TEACH AI
  // ======================
  const teach = async (
    entity: string,
    attribute: string,
    kind?: string,
    knowledgeType?: KnowledgeType
  ) => {
    if (!teachValue.trim()) return;

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teach: true,
        entity,
        attribute,
        kind,
        knowledgeType,
        value: teachValue,
      }),
    });

    setMessages(prev => [
      ...prev,
      {
        text: `✅ Learned: ${attribute} of ${entity} = ${teachValue}`,
        role: "ai",
        taught: true,
      },
    ]);

    setTeachValue("");
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="fixed bottom-4 right-4 w-full sm:w-96 z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-zinc-900 text-white px-4 py-2 rounded-t-xl">
        <span
          className="font-semibold cursor-pointer"
          onClick={() => setIsOpen(o => !o)}
        >
          AI Assistant
        </span>

        <div className="flex gap-2 items-center">
          {trace && (
            <button
              onClick={() => setTraceOpen(true)}
              className="text-xs px-2 py-1 bg-zinc-800 rounded hover:bg-zinc-700"
            >
              Trace
            </button>
          )}

          <span
            className="cursor-pointer text-sm opacity-70"
            onClick={() => setIsOpen(o => !o)}
          >
            {isOpen ? "—" : "▲"}
          </span>
        </div>
      </div>


      {isOpen && (
        <div className="flex flex-col h-[520px] bg-black text-white border border-zinc-800 rounded-b-xl">
          <SuggestedQuestions onSelect={setInput} />
          {/* CHAT AREA */}
          <div className="flex flex-col h-full">

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24">

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded max-w-sm ${m.role === "user"
                    ? "bg-blue-600 self-end"
                    : "bg-zinc-800 self-start"
                    }`}
                >
                  <div>{m.text}</div>

                  {m.teachNeeded && m.entity && m.attribute && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={teachValue}
                        onChange={e => setTeachValue(e.target.value)}
                        placeholder={`Teach: ${m.attribute} of ${m.entity}`}
                        className="flex-1 bg-zinc-900 border border-zinc-700 p-1 rounded text-white text-sm"
                        onKeyDown={e =>
                          e.key === "Enter" &&
                          teach(m.entity!, m.attribute!, m.kind, m.knowledgeType)
                        }
                      />
                      <button
                        onClick={() =>
                          teach(m.entity!, m.attribute!, m.kind, m.knowledgeType)
                        }
                        className="bg-green-600 px-3 rounded text-sm"
                      >
                        Teach
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* INPUT */}
            <div className="sticky bottom-0 bg-black border-t border-zinc-800 p-3">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-zinc-900 border border-zinc-700 p-2 rounded text-white"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Ask something…"
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 px-4 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* TRACE */}
          <TraceDrawer
            trace={trace}
            open={traceOpen}
            onClose={() => setTraceOpen(false)}
          />

        </div>
      )}
    </div>
  );
}

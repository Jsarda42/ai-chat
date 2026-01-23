"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  role: "user" | "ai";
  kind?: string;
  entity?: string | null;
  attribute?: string | null;
  teachNeeded?: boolean;
  taught?: boolean;
};

export default function TesterPage() {
  const [input, setInput] = useState("");
  const [teachValue, setTeachValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
    console.log("AI entity:", data.entity);
    console.log("AI attribute:", data.attribute);
    console.log("shape:", data.shape);
    console.log("AI teachNeeded:", data.teachNeeded);

    setMessages(prev => [
      ...prev,
      {
        text: data.response ?? "(I don't know yet)",
        role: "ai",
        kind: data.kind,
        entity: data.entity,
        attribute: data.attribute,
        teachNeeded: data.teachNeeded,
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
    kind?: string
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
    <div className="fixed bottom-0 right-0 w-full sm:w-96 z-50">
      {/* Header */}
      <div
        className="flex justify-between items-center bg-zinc-900 text-white px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(o => !o)}
      >
        <span className="font-semibold">AI Chat</span>
        <button className="text-sm opacity-70 hover:opacity-100">
          {isOpen ? "—" : "▲"}
        </button>
      </div>

      {/* Chat body */}
      {isOpen && (
        <div className="flex flex-col h-96 bg-black text-white p-4 border-t border-zinc-800">
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded max-w-sm ${
                  m.role === "user"
                    ? "bg-blue-600 self-end"
                    : "bg-zinc-800 self-start"
                }`}
              >
                <div>{m.text}</div>

                {/* Teaching UI */}
                {m.teachNeeded && m.entity && m.attribute && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={teachValue}
                      onChange={e => setTeachValue(e.target.value)}
                      placeholder={`Teach: ${m.attribute} of ${m.entity}`}
                      className="flex-1 bg-zinc-900 border border-zinc-700 p-1 rounded text-white"
                      onKeyDown={e =>
                        e.key === "Enter" &&
                        teach(m.entity!, m.attribute!, m.kind)
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        teach(m.entity!, m.attribute!, m.kind)
                      }
                      className="bg-green-600 px-3 rounded"
                    >
                      Teach
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 mt-4">
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
      )}
    </div>
  );
}

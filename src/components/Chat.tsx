"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
  confidence?: number;
  needsTraining?: boolean;
};

export default function Chat() {
  const [isOpen, setIsOpen] = useState(true);
  const [teachFor, setTeachFor] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! Talk to me 👋" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages(prev => [...prev, { role: "user", text: userMessage }]);
  setInput("");

  try {
    const payload: any = { message: userMessage };

    if (teachFor) {
      payload.teachFor = teachFor;
    }

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        text: data.text ?? "🤖 No response",
        confidence: data.confidence,
        needsTraining: data.needsTraining
      }
    ]);

    // 🔑 Teaching state
    if (data.needsTraining && data.input) {
      setTeachFor(data.input);
    } else {
      setTeachFor(null);
    }

  } catch (err) {
    setMessages(prev => [
      ...prev,
      { role: "ai", text: "Server error 🤖" }
    ]);
  }
}


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
        <div className="flex flex-col h-80 bg-black text-white p-4 border-t border-zinc-800">
          <div className="flex-1 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded max-w-sm ${m.role === "user"
                  ? "bg-blue-600 self-end"
                  : "bg-zinc-800 self-start"
                  }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              className="flex-1 bg-zinc-900 border border-zinc-700 p-2 rounded"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Say something…"
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

"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  role: "user" | "ai";
  kind?: string;
  concept?: string | null;
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, role: "user" }]);

    // Call API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    console.group(`AI Test: "${input}"`);
    console.log("Input:", input);
    console.log("Detected kind:", data.kind);
    console.log("Detected concept:", data.concept);
    console.log("Response:", data.response);
    console.log("TeachNeeded:", data.teachNeeded);
    console.groupEnd();

    // Add AI response
    setMessages(prev => [
      ...prev,
      {
        text: data.response || "(I don't know yet!)",
        role: "ai",
        kind: data.kind,
        concept: data.concept,
        teachNeeded: data.teachNeeded,
      },
    ]);

    setInput("");
  };

  const teach = async (concept: string, kind?: string) => {
    if (!teachValue.trim()) return;

    // Store in Firestore
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teach: true, concept, kind, value: teachValue }),
    });

    // Show teaching confirmation
    setMessages(prev => [
      ...prev,
      {
        text: `✅ Taught "${concept}" as "${teachValue}"`,
        role: "ai",
        concept,
        kind,
        taught: true,
      },
    ]);

    setTeachValue("");

    // Optionally, AI responds immediately with the value
    setMessages(prev => [
      ...prev,
      {
        text: teachValue,
        role: "ai",
        concept,
        kind,
      },
    ]);
  };

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
                className={`p-2 rounded max-w-sm ${
                  m.role === "user" ? "bg-blue-600 self-end" : "bg-zinc-800 self-start"
                }`}
              >
                {m.text}

                {m.teachNeeded && m.concept && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={teachValue}
                      onChange={e => setTeachValue(e.target.value)}
                      placeholder={`Teach AI: value for "${m.concept}"`}
                      className="flex-1 bg-zinc-900 border border-zinc-700 p-1 rounded text-black"
                      onKeyDown={e => e.key === "Enter" && teach(m.concept!, m.kind)}
                    />
                    <button
                      onClick={() => teach(m.concept!, m.kind)}
                      className="bg-green-600 px-2 rounded"
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
              placeholder="Say something…"
            />
            <button onClick={sendMessage} className="bg-green-600 px-4 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

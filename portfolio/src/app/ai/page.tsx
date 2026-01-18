"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! Talk to me 👋" }
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);

const res = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: input }),
  
});
console.log("RAW RESPONSE:", res);
let data;
try {
  data = await res.json();
} catch {
  data = { text: "Invalid server response 🤖" };
}


   setMessages(prev => [
  ...prev,
  { role: "ai", text: data.text, confidence: data.confidence }
]);


    setInput("");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6">
      <div className="flex-1 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-sm ${
              m.role === "user"
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
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

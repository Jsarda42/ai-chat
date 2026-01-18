"use client";

import { useEffect, useState } from "react";

export default function MemoryPage() {
  const [memory, setMemory] = useState<Record<string, string>>({});

  async function loadMemory() {
    const res = await fetch("/api/memory");
    const data = await res.json();
    setMemory(data);
  }

  async function deleteMemory(key: string) {
    await fetch("/api/memory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key })
    });

    loadMemory();
  }

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>🧠 AI Memory</h1>

      {Object.keys(memory).length === 0 && (
        <p>No learned memory yet.</p>
      )}

      <ul>
        {Object.entries(memory).map(([input, output]) => (
          <li key={input} style={{ marginBottom: 12 }}>
            <strong>User:</strong> {input}
            <br />
            <strong>AI:</strong> {output}
            <br />
            <button onClick={() => deleteMemory(input)}>
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

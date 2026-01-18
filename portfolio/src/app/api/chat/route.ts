export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { chatBrain } from "@/ai/chatBrain";

let pendingInput: string | null = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Teaching phase
    if (pendingInput) {
      chatBrain.learn(pendingInput, message);
      pendingInput = null;

      return NextResponse.json({
        text: "Got it 👍 I learned that.",
        confidence: 1
      });
    }

    // Normal chat
    const result = chatBrain.getResponse(message);

    if (result.needsTraining) {
      pendingInput = result.input;
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("CHAT API ERROR:", err);

    return NextResponse.json(
      { text: "Server error 🤖", confidence: 0 },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { chatBrain } from "@/ai/chatBrain";

export async function POST(req: Request) {
  try {
    const { message, teachFor } = await req.json();

    if (!message) {
      return NextResponse.json(
        { text: "Invalid input" },
        { status: 400 }
      );
    }

    // 1️⃣ Explicit teaching
    if (teachFor) {
      await chatBrain.learn(teachFor, message);

      return NextResponse.json({
        text: `Got it 👍 I learned that "${teachFor}" means "${message}"`,
        confidence: 1,
        needsTraining: false
      });
    }

    // 2️⃣ Normal response
    const response = await chatBrain.getResponse(message);

    return NextResponse.json(response);

  } catch (err) {
    console.error("[API /chat]", err);
    return NextResponse.json(
      { text: "Server error 🤖" },
      { status: 500 }
    );
  }
}

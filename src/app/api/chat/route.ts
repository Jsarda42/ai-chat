import { NextRequest, NextResponse } from "next/server";
import { processInput, teachConcept } from "@/aiV2/processInput";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // TEACHING FLOW
  if (body.teach === true) {
    const { entity, attribute, kind, value } = body;
    if (!entity || !attribute || !value) {
      return NextResponse.json(
        { error: "Missing teaching fields" },
        { status: 400 }
      );
    }

    const saved = await teachConcept(entity, attribute, kind, value);

    return NextResponse.json({ status: "ok", saved });
  }

  // NORMAL CHAT FLOW
  const { input } = body;

  if (!input) {
    return NextResponse.json(
      { error: "Missing input" },
      { status: 400 }
    );
  }

  const result = await processInput(input);
  return NextResponse.json(result);
}

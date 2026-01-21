import { NextRequest, NextResponse } from "next/server";
import { processInput, teachConcept } from "@/aiV2/processInput";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.teach) {
    // Teaching flow
    const { concept, kind, value } = body;
    const saved = await teachConcept(concept, kind, value);
    return NextResponse.json({ status: "ok", saved });
  }

  // Normal chat flow
  const { input } = body;
  const result = await processInput(input);

  return NextResponse.json(result);
}

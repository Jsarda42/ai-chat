import { NextResponse } from "next/server";
import { loadKnowledge, saveKnowledge } from "@/ai/knowledgeStore";

export async function GET() {
  const knowledge = loadKnowledge();
  return NextResponse.json(knowledge);
}

export async function DELETE(req: Request) {
  const { key } = await req.json();
  const knowledge = loadKnowledge();

  delete knowledge[key];
  saveKnowledge(knowledge);

  return NextResponse.json({ success: true });
}

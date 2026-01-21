// /aiV2/utils/memory.ts
import { db } from "../lib/firebaseAdmin";
const KNOWLEDGE_COLLECTION = "knowledge";

export interface KnowledgeEntry {
  concept: string;
  kind: "question" | "command" | "statement";
  value: string;
  createdAt: Date;
}

/**
 * Find a knowledge entry by concept (exact match)
 */
export async function findKnowledge(concept: string): Promise<string | null> {
  const knowledgeRef = db.collection(KNOWLEDGE_COLLECTION);
  const snapshot = await knowledgeRef.where("concept", "==", concept).get();

  if (snapshot.empty) return null;

  // return the value of the first matching entry
  const doc = snapshot.docs[0].data() as KnowledgeEntry;
  return doc.value;
}

/**
 * Store a new knowledge entry
 */
export async function storeKnowledge(
  concept: string,
  kind: KnowledgeEntry["kind"],
  value: string
) {
  const knowledgeRef = db.collection(KNOWLEDGE_COLLECTION);
  await knowledgeRef.add({
    concept,
    kind,
    value,
    createdAt: new Date(),
  });
}

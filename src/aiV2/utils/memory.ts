// /aiV2/utils/memory.ts
import { db } from "../lib/firebaseAdmin";
import { KnowledgeType } from "../types/knowledgeType";
const KNOWLEDGE_COLLECTION = "knowledge";


export interface KnowledgeEntry {
  entity: string;
  attribute?: string | null;
  knowledgeType: KnowledgeType;
  kind: "question" | "command" | "statement";
  value: string;
  createdAt: Date;
}

/**
 * Find a knowledge entry by entity and attribute (exact match)
 */
export async function findKnowledge(
  entity: string,
  knowledgeType: KnowledgeType,
  attribute?: string | null
) {
  let query = db
    .collection(KNOWLEDGE_COLLECTION)
    .where("entity", "==", entity)
    .where("knowledgeType", "==", knowledgeType);

  if (attribute) {
    query = query.where("attribute", "==", attribute);
  }

  const snapshot = await query.get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0].data() as KnowledgeEntry;
  return doc.value;
}


/**
 * Store a new knowledge entry
 */
export async function storeKnowledge(
  entity: string,
  knowledgeType: KnowledgeType,
  kind: "command" | "question" | "statement",
  value: string,
  attribute?: string | null
) {
  await db.collection(KNOWLEDGE_COLLECTION).add({
    entity,
    knowledgeType,
    attribute: attribute ?? null,
    kind,
    value,
    createdAt: Date(),
  });
}



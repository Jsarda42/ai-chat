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
 * Find a knowledge entry by entity and attribute (exact match)
 */
export async function findKnowledge(entity: string, attribute: string) {
    const knowledgeRef = db.collection(KNOWLEDGE_COLLECTION);
    const snapshot = await knowledgeRef.where("entity", "==", entity).where("attribute", "==", attribute).get();

    if (snapshot.empty) return null;

    // return the value of the first matching entry
    const doc = snapshot.docs[0].data() as KnowledgeEntry;
    return doc.value;
}

/**
 * Store a new knowledge entry
 */
export async function storeKnowledge(
    entity: string,
    attribute: string,
    kind: "command" | "question" | "statement",
    value: string
) {
    await db.collection("knowledge").add({
        entity,
        attribute,
        kind,
        value,
        createdAt: Date(),
    });
}


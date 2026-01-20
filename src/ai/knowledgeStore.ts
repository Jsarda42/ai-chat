import { db } from "@/lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { Knowledge } from "./type";

const COLLECTION = "knowledge";

/**
 * Load all knowledge from Firestore
 */
export async function loadKnowledge(): Promise<Knowledge> {
  const snapshot = await db.collection(COLLECTION).get();
  const knowledge: Knowledge = {};

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data?.response) {
      knowledge[doc.id] = data.response;
    }
  });

  console.log("[Firestore] Loaded knowledge keys:", Object.keys(knowledge));
  return knowledge;
}


/**
 * Save / update knowledge entries
 */
export async function saveKnowledge(knowledge: Knowledge) {
  const batch = db.batch();

  for (const key in knowledge) {
    const ref = db.collection(COLLECTION).doc(key);

    batch.set(
      ref,
      {
        response: knowledge[key],
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  }

  await batch.commit();
}

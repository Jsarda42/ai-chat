import { normalize } from "./utils/normalizer";
import { detectInputKind } from "./utils/detectInputKind";
import { extractConcept } from "./utils/exctractConcept";
import { findKnowledge, storeKnowledge } from "./utils/memory";

export async function processInput(input: string) {
  const normalized = normalize(input);
  const kind = detectInputKind(normalized);
  const candidateConcept = extractConcept(normalized);

  let response: string | null = null;

  if (kind === "question" && candidateConcept) {
    response = await findKnowledge(candidateConcept);

    if (!response) {
      // AI doesn't know → needs teaching
      return {
        kind,
        concept: candidateConcept,
        response: null,
        teachNeeded: true,
      };
    }
  }

  return {
    kind,
    concept: candidateConcept,
    response,
    teachNeeded: false,
  };
}

export async function teachConcept(concept: string, kind: string, value: string) {
  await storeKnowledge(concept, kind as any, value);
  return { concept, value };
}

import { normalize, normalizePossessive } from "./utils/normalizer";
import { detectInputKind } from "./utils/detectInputKind";
import { extractEntityAndAttribute } from "./utils/exctractConcept";
import { findKnowledge, storeKnowledge } from "./utils/memory";
import { estimateAnswerShape } from "./utils/estimateAnswerShape";
import { canonicalizeAttribute } from "./utils/canonicalizeAttribute";
import { mapAttributeSynonym } from "./utils/mapAttributeSynonym";

export async function processInput(input: string) {
  const normalized = normalize(input);
  const possessiveNormalized = normalizePossessive(normalized);
  const kind = detectInputKind(possessiveNormalized);
  const { entity, attribute: rawAttribute } = extractEntityAndAttribute(possessiveNormalized);
  const mapAttribute = mapAttributeSynonym(rawAttribute);
  const attribute = canonicalizeAttribute(mapAttribute);
  let response: string | null = null;

  if (kind === "question" && entity && attribute) {
    response = await findKnowledge(entity, attribute);
  }
  const shape = estimateAnswerShape({
    text: normalized,
    kind,
    entity,
    attribute,
  });

  const teachable = shape === "fact" || shape === "definition" || shape === "number";
  const teachNeeded =
    kind === "question" &&
    entity &&
    attribute &&
    response === null && teachable;




  return {
    kind,
    entity,
    attribute,
    response,
    teachNeeded,
    shape,
  };

}
export async function teachConcept(entity: string, attribute: string, kind: string, value: string) {
  await storeKnowledge(entity, attribute, kind as any, value);
  return { entity, attribute, value };
}


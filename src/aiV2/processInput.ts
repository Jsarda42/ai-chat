import { normalize } from "./utils/normalizer";
import { detectInputKind } from "./utils/detectInputKind";
import { extractEntityAndAttribute } from "./utils/exctractConcept";
import { findKnowledge, storeKnowledge } from "./utils/memory";
import { estimateAnswerShape } from "./utils/estimateAnswerShape";
import { canonicalizeAttribute } from "./utils/canonicalizeAttribute";

export async function processInput(input: string) {
  const normalized = normalize(input);
  const kind = detectInputKind(normalized);
  const { entity, attribute: rawAttribute } = extractEntityAndAttribute(normalized);
  const attribute = canonicalizeAttribute(rawAttribute);
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


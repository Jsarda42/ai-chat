import { normalize, normalizePossessive } from "./utils/normalizer";
import { detectInputKind } from "./utils/detectInputKind";
import { extractEntityAndAttribute } from "./utils/exctractConcept";
import { findKnowledge, storeKnowledge } from "./utils/memory";
import { estimateAnswerShapeWithTrace } from "./utils/estimateAnswerShape";
import { canonicalizeAttribute } from "./utils/canonicalizeAttribute";
import { mapAttributeSynonym } from "./utils/mapAttributeSynonym";
import { inferKnowledgeType } from "./utils/inferKnowledgeType";
import { validateKnowledgeValue } from "./utils/validateKnowledgeValue";
import { KnowledgeType } from "./types/knowledgeType";
import { isAboutSelf } from "./utils/isAboutSelf";
import { SELF_DESCRIPTION } from "./language/selfDescription";

function requiresAttribute(type: KnowledgeType) {
  return type !== "definition";
}
export async function processInput(input: string) {
  const normalized = normalize(input);

  // 🧠 META: AI explains itself
  if (isAboutSelf(normalized)) {
    return {
      kind: "meta",
      response: SELF_DESCRIPTION,
      teachNeeded: false,
      shape: "definition",
      trace: {
        input: {
          raw: input,
          normalized,
        },
        interpretation: {
          kind: "meta",
          entity: null,
          attribute: null,
        },
        reasoning: {
          questionFormSignals: [],
          attributeSignals: [],
          stabilitySignals: [],
        },
        scores: {
          fact: 0,
          number: 0,
          definition: 5,
          procedure: 3,
          recommendation: 0,
        },
        outcome: {
          shape: "definition",
          teachable: false,
        },
      },
    };
  }

  // ⬇️ normal flow continues here

  const possessiveNormalized = normalizePossessive(normalized);
  const kind = detectInputKind(possessiveNormalized);
  const { entity, attribute: rawAttribute } = extractEntityAndAttribute(possessiveNormalized);
  const mapAttribute = mapAttributeSynonym(rawAttribute);
  const attribute = canonicalizeAttribute(mapAttribute);
  let response: string | null = null;


  const { shape, trace } = estimateAnswerShapeWithTrace({
    text: normalized,
    kind,
    entity,
    attribute,
    raw: input,
    normalized,
  });

  

  const knowledgeType = inferKnowledgeType({ shape, attribute });

  if (!knowledgeType) {
    return {
      error: "Cannot infer knowledge type",
      trace
    };
  }

  if (
    kind === "question" &&
    entity &&
    knowledgeType &&
    (!requiresAttribute(knowledgeType) || attribute)
  ) {
    response = await findKnowledge(
      entity,
      knowledgeType,
      attribute
    );
  }

  const teachable = shape === "fact" || shape === "definition" || shape === "number";
  const teachNeeded =
    kind === "question" &&
    entity &&
    knowledgeType &&
    (!requiresAttribute(knowledgeType) || attribute) &&
    response === null &&
    teachable;


  const teachingExpectation =
    teachNeeded && entity && attribute
      ? {
        entity,
        attribute,
        knowledgeType,
      }
      : null;

  if (teachingExpectation) {
    trace.outcome.teachingExpectation = teachingExpectation;
  }

  return {
    kind,
    entity,
    attribute,
    response,
    teachNeeded,
    shape,
    trace,
    knowledgeType
  };

}
export async function teachConcept(entity: string, attribute: string, kind: string, value: string, knowledgeType: KnowledgeType) {
  const validation = validateKnowledgeValue(knowledgeType, value);

  if (!validation.valid) {
    return {
      error: validation.reason,
    };
  }
  await storeKnowledge(entity, knowledgeType, kind as any, value, attribute)
  return { entity, attribute, value };
}


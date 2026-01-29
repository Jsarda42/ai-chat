import { AnswerShape, ShapeInput, ShapeScore } from "../core/answerShapes";
import { QUESTION_FORM_SIGNALS } from "../language/questionPatterns";
import { INSTABILITY_PATTERNS } from "../language/instabilityPatterns";
import { MEASURABLE_ATTRIBUTES } from "../language/measurableAttributes";
import { InputKind } from "../core/inputKinds";
import { SignalHit } from "./DecisionTrace";
import { DecisionTrace } from "./DecisionTrace";
/* =========================
   Init
   ========================= */

function initScores(): ShapeScore {
  return {
    fact: 0,
    number: 0,
    definition: 0,
    procedure: 0,
    recommendation: 0,
  };
}

/* =========================
   Signals
   ========================= */

function applyQuestionFormSignals(
  text: string,
  scores: ShapeScore,
  hits: SignalHit[],
) {
  for (const signal of QUESTION_FORM_SIGNALS) {
    if (text.startsWith(signal.startsWith)) {
      scores[signal.shape] += signal.weight;
      hits.push({
        signal: `question:${signal.startsWith}`,
        shape: signal.shape,
        weight: signal.weight,
      });
      return; // first strong signal wins
    }
  }
}

function applyEntityAttributeSignal(
  entity?: string | null,
  attribute?: string | null,
  scores?: ShapeScore,
  hits?: SignalHit[],
) {
  if (!entity || !attribute || !scores || !hits) return;

  if (MEASURABLE_ATTRIBUTES.includes(attribute)) {
    scores.number += 3;
    hits.push({
      signal: `attribute:${attribute}`,
      shape: "number",
      weight: 3,
    });
    return;
  }

  // stable factual attribute
  scores.fact += 2;
  hits.push({
    signal: `attribute:${attribute}`,
    shape: "fact",
    weight: 2,
  });
}

function applyStabilitySignal(
  text: string,
  scores: ShapeScore,
  hits: SignalHit[],
) {
  if (INSTABILITY_PATTERNS.some(p => text.includes(p))) {
    scores.recommendation += 3;
    scores.procedure += 1;
    hits.push({
      signal: "instability",
      shape: "recommendation",
      weight: 3,
    });
  }

}

function applyDefinitionSignal(
  text: string,
  scores: ShapeScore,
  hits: SignalHit[],
) {
  if (text.includes("define") || text.includes("definition")) {
    scores.definition += 2;
    hits.push({
      signal: "definition_keyword",
      shape: "definition",
      weight: 2,
    });
  }
}

/* =========================
   Resolution
   ========================= */

function resolveShape(scores: ShapeScore): AnswerShape {
  const entries = Object.entries(scores) as [AnswerShape, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const [topShape, topScore] = entries[0];

  if (topScore < 3) return "unknown";
  return topShape;
}

/* =========================
   Public API
   ========================= */

export function estimateAnswerShapeWithTrace(
  input: ShapeInput & {
    raw: string;
    normalized: string;
    kind: InputKind;
  }
): { shape: AnswerShape; trace: DecisionTrace } {

  const scores = initScores();

  const trace: DecisionTrace = {
    input: {
      raw: input.raw,
      normalized: input.normalized,
    },
    interpretation: {
      kind: input.kind,
      entity: input.entity ?? null,
      attribute: input.attribute ?? null,
    },
    reasoning: {
      questionFormSignals: [],
      attributeSignals: [],
      stabilitySignals: [],
    },
    scores,
    outcome: {
      shape: "unknown",
      teachable: false,
    },
  };

  if (input.kind !== "question") {
    return { shape: "unknown", trace };
  }

  applyQuestionFormSignals(
    input.text,
    scores,
    trace.reasoning.questionFormSignals
  );

  applyEntityAttributeSignal(
    input.entity,
    input.attribute,
    scores,
    trace.reasoning.attributeSignals
  );

  applyStabilitySignal(
    input.text,
    scores,
    trace.reasoning.stabilitySignals
  );

  applyDefinitionSignal(
    input.text,
    scores,
    trace.reasoning.attributeSignals
  );

  const shape = resolveShape(scores);

  trace.outcome.shape = shape;
  trace.outcome.teachable =
    shape === "fact" || shape === "number" || shape === "definition";

  return { shape, trace };
}


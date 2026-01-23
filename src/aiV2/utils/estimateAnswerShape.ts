import { AnswerShape, ShapeInput, ShapeScore } from "../core/answerShapes";
import { QUESTION_FORM_SIGNALS } from "../language/questionPatterns";
import { INSTABILITY_PATTERNS } from "../language/instabilityPatterns";
import { MEASURABLE_ATTRIBUTES } from "../language/measurableAttributes";

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
  scores: ShapeScore
) {
  for (const signal of QUESTION_FORM_SIGNALS) {
    if (text.startsWith(signal.startsWith)) {
      scores[signal.shape] += signal.weight;
      return; // first strong signal wins
    }
  }
}

function applyEntityAttributeSignal(
  entity?: string | null,
  attribute?: string | null,
  scores?: ShapeScore
) {
  if (!entity || !attribute || !scores) return;

  if (MEASURABLE_ATTRIBUTES.includes(attribute)) {
    scores.number += 3;
    return;
  }

  // stable factual attribute
  scores.fact += 2;
}

function applyStabilitySignal(
  text: string,
  scores: ShapeScore
) {
  if (INSTABILITY_PATTERNS.some(p => text.includes(p))) {
    scores.recommendation += 3;
    scores.procedure += 1;
  }
}

function applyDefinitionSignal(
  text: string,
  scores: ShapeScore
) {
  if (text.includes("define") || text.includes("definition")) {
    scores.definition += 2;
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

export function estimateAnswerShape(input: ShapeInput): AnswerShape {
  if (input.kind !== "question") return "unknown";

  const scores = initScores();

  applyQuestionFormSignals(input.text, scores);
  applyEntityAttributeSignal(input.entity, input.attribute, scores);
  applyStabilitySignal(input.text, scores);
  applyDefinitionSignal(input.text, scores);

  return resolveShape(scores);
}

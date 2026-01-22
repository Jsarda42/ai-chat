export type AnswerShape =
  | "fact"
  | "number"
  | "definition"
  | "procedure"
  | "recommendation"
  | "unknown";

  type ShapeInput = {
  text: string;
  kind: "question" | "command" | "greeting" | "statement" | "unknown";
  entity?: string | null;
  attribute?: string | null;
};

type ShapeScore = {
  fact: number;
  number: number;
  definition: number;
  procedure: number;
  recommendation: number;
};

function initScores(): ShapeScore {
  return {
    fact: 0,
    number: 0,
    definition: 0,
    procedure: 0,
    recommendation: 0,
  };
}

function applyQuestionFormSignal(
  text: string,
  scores: ShapeScore
) {
  if (text.startsWith("how many") || text.startsWith("how much")) {
    scores.number += 3;
    return;
  }

  if (text.startsWith("what is") || text.startsWith("what was")) {
    scores.fact += 2;
    scores.definition += 1;
    return;
  }

  if (text.startsWith("who")) {
    scores.fact += 3;
    return;
  }

  if (text.startsWith("when")) {
    scores.fact += 2;
    return;
  }

  if (text.startsWith("how to") || text.startsWith("how do i")) {
    scores.procedure += 3;
    return;
  }

  if (text.startsWith("where")) {
    scores.recommendation += 3;
  }
}

function applyEntityAttributeSignal(
  entity?: string | null,
  attribute?: string | null,
  scores?: ShapeScore
) {
  if (!entity || !attribute || !scores) return;

  // measurable attributes → number
  const measurableAttributes = [
    "population",
    "age",
    "height",
    "weight",
    "size",
    "length",
    "distance",
  ];

  if (measurableAttributes.includes(attribute)) {
    scores.number += 3;
    return;
  }

  // descriptive attributes → fact
  scores.fact += 2;
}

function applyStabilitySignal(
  text: string,
  scores: ShapeScore
) {
  const unstablePatterns = [
    "good",
    "best",
    "near me",
    "i ",
    "you ",
    "recommend",
  ];

  if (unstablePatterns.some(p => text.includes(p))) {
    scores.recommendation += 3;
    scores.procedure += 1;
  }
}

function applyAnswerLengthSignal(
  text: string,
  scores: ShapeScore
) {
  if (text.includes("define") || text.includes("definition")) {
    scores.definition += 2;
  }
}

function resolveShape(scores: ShapeScore): AnswerShape {
  const entries = Object.entries(scores) as [AnswerShape, number][];

  entries.sort((a, b) => b[1] - a[1]);

  const [topShape, topScore] = entries[0];

  if (topScore < 3) return "unknown";

  return topShape;
}

export function estimateAnswerShape(input: ShapeInput): AnswerShape {
  if (input.kind !== "question") return "unknown";

  const scores = initScores();

  applyQuestionFormSignal(input.text, scores);
  applyEntityAttributeSignal(input.entity, input.attribute, scores);
  applyStabilitySignal(input.text, scores);
  applyAnswerLengthSignal(input.text, scores);

  return resolveShape(scores);
}









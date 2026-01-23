export type ANSWER_SHAPES = 
    | "fact"
    | "number"
    | "definition"
    | "procedure"
    | "recommendation"
    | "unknown"
;

export type AnswerShape = ANSWER_SHAPES;

export type ShapeInput = {
  text: string;
  kind: "question" | "command" | "greeting" | "statement" | "unknown";
  entity?: string | null;
  attribute?: string | null;
};

export type ShapeScore = Record<
  Exclude<AnswerShape, "unknown">,
  number
>;

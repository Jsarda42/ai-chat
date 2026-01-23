import { AnswerShape } from "../core/answerShapes";

export type QuestionFormSignal = {
  startsWith: string;
  shape: Exclude<AnswerShape, "unknown">;
  weight: number;
};

export const QUESTION_FORM_SIGNALS: QuestionFormSignal[] = [
  { startsWith: "how many", shape: "number", weight: 3 },
  { startsWith: "how much", shape: "number", weight: 3 },
  { startsWith: "what is", shape: "fact", weight: 2 },
  { startsWith: "who", shape: "fact", weight: 3 },
  { startsWith: "how to", shape: "procedure", weight: 3 },
  { startsWith: "where", shape: "recommendation", weight: 3 },
  { startsWith: "what ", shape: "fact", weight: 1 },
];

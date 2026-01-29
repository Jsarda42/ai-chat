import { AnswerShape } from "../core/answerShapes";
import { InputKind } from "../core/inputKinds";

export type SignalHit = {
  signal: string;
  shape: AnswerShape;
  weight: number;
};

export type DecisionTrace = {
  input: {
    raw: string;
    normalized: string;
  };

  interpretation: {
    kind: InputKind;
    entity: string | null;
    attribute: string | null;
  };

  reasoning: {
    questionFormSignals: SignalHit[];
    attributeSignals: SignalHit[];
    stabilitySignals: SignalHit[];
  };

  scores: {
    fact: number;
    number: number;
    definition: number;
    procedure: number;
    recommendation: number;
  };

  outcome: {
    shape: AnswerShape;
    teachable: boolean;
  };
};

const INPUT_KINDS = [
  "greeting",
  "command",
  "question",
  "statement",
  "unknown",
] as const;

export type InputKind = typeof INPUT_KINDS[number];
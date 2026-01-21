import { normalize } from "./normalizer";

export const INPUT_KINDS = [
  "greeting",
  "command",
  "question",
  "statement",
  "unknown",
] as const;

type InputKind = typeof INPUT_KINDS[number];

/* =========================
   Keyword definitions
   ========================= */

const GREETING_WORDS = ["hello", "hi", "hey", "good morning", "good evening"];

const COMMAND_VERBS = ["remember", "forget", "teach", "reset"];

const QUESTION_WORDS = ["what", "how", "why", "when", "where", "who"];

const QUESTION_AUXILIARIES = [
  "is",
  "are",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "will",
  "shall",
];

/* =========================
   Helpers
   ========================= */

function getWords(text: string): string[] {
  return text.split(" ");
}

/* =========================
   Detectors
   ========================= */

function isGreeting(text: string): boolean {
  const normalized = normalize(text);
  const words = normalized.split(" ");

  for (const greeting of GREETING_WORDS) {
    const greetingWords = greeting.split(" ");

    // exact match: "hello", "good morning"
    if (normalized === greeting) {
      return true;
    }

    // greeting followed by 1 optional filler word ("there", "everyone")
    if (
      words.length === greetingWords.length + 1 &&
      normalized.startsWith(greeting + " ")
    ) {
      return true;
    }
  }

  return false;
}


function isCommand(text: string): boolean {
  const normalized = normalize(text);
  const words = getWords(normalized);

  if (words.length === 0) return false;

  // commands start with a control verb
  return COMMAND_VERBS.includes(words[0]);
}

function isQuestion(text: string): boolean {
  const normalized = normalize(text);
  const words = getWords(normalized);

  if (words.length < 2) return false;

  // strong signal #1: question mark
  if (text.trim().endsWith("?")) {
    return true;
  }

  // strong signal #2: starts with question word
  if (QUESTION_WORDS.includes(words[0])) {
    return true;
  }

  // strong signal #3: starts with auxiliary verb
  if (QUESTION_AUXILIARIES.includes(words[0])) {
    return true;
  }

  return false;
}

/* =========================
   Main classifier
   ========================= */

export function detectInputKind(text: string): InputKind {
  if (!text || !text.trim()) {
    return "unknown";
  }

  if (isGreeting(text)) {
    return "greeting";
  }

  if (isCommand(text)) {
    return "command";
  }

  if (isQuestion(text)) {
    return "question";
  }

  return "statement";
}

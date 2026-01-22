const FACTUAL_ATTRIBUTES = [
  "population",
  "capital",
  "currency",
  "area",
  "language",
  "president",
  "founder",
  "birth",
  "date",
  "height",
  "weight",
  "age",
];

const NOISE_WORDS = [
  "i",
  "you",
  "we",
  "they",
  "find",
  "get",
  "know",
  "tell",
  "about",
  "can",
  "could",
  "please",
];

export function canonicalizeAttribute(raw: string | null): string | null {
  if (!raw) return null;

  const tokens = raw.split(" ");

  // remove noise
  const cleaned = tokens.filter(t => !NOISE_WORDS.includes(t));

  if (cleaned.length === 0) return null;

  // find factual attribute
  for (const token of cleaned) {
    if (FACTUAL_ATTRIBUTES.includes(token)) {
      return token;
    }
  }

  return null;
}

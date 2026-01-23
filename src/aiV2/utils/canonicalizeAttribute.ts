import { FACTUAL_ATTRIBUTES } from "@/aiV2/language/attributes";
import { NOISE_WORDS } from "@/aiV2/language/noiseWords";

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

import { levenshtein } from "./editDistance";

function wordSimilarityScore(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

export function wordSimilarity(a: string, b: string): number {
  const wordsA = a.split(" ");
  const wordsB = b.split(" ");

  let score = 0;
  let comparisons = 0;

  for (const wa of wordsA) {
    let best = 0;

    for (const wb of wordsB) {
      const s =
        wa === wb
          ? 1
          : wordSimilarityScore(wa, wb);

      if (s > best) best = s;
    }

    // boost short important words
    const weight = wa.length <= 2 ? 1.3 : 1;
    score += best * weight;
    comparisons++;
  }

  return comparisons === 0 ? 0 : score / comparisons;
}

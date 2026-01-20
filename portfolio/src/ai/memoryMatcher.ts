import { wordSimilarity } from "./similarity";

export function findBestMemoryMatch(
  input: string,
  knowledge: Record<string, string>
) {
  let bestScore = 0;
  let bestAnswer: string | null = null;

  for (const knownKey in knowledge) {
    const score = wordSimilarity(input, knownKey);

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = knowledge[knownKey];
    }
  }

  return { bestScore, bestAnswer };
}

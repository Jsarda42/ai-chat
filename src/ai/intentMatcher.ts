import fs from "fs";
import path from "path";
import { wordSimilarity } from "./similarity";

type Intent = {
  intent: string;
  patterns: string[];
  response: string;
};

const intentsPath = path.join(process.cwd(), "src/ai/intents");

const intents: Intent[] = fs
  .readdirSync(intentsPath)
  .map(file =>
    JSON.parse(fs.readFileSync(path.join(intentsPath, file), "utf-8"))
  );

export function matchIntent(input: string) {
  let bestScore = 0;
  let bestIntent: Intent | null = null;

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const score = wordSimilarity(input, pattern);
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }
  }

  return bestScore > 0.65 ? bestIntent : null;
}

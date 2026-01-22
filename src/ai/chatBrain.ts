import { loadKnowledge, saveKnowledge } from "./knowledgeStore";
import { normalize } from "./normalize";
import { findBestMemoryMatch } from "./memoryMatcher";
import { CONFIDENT, UNCERTAIN, LOW } from "./thresholds";
import { ChatResponse, Knowledge } from "./type";
import { matchIntent } from "./intentMatcher";

class ChatBrain {
  private knowledge: Knowledge = {};
  private initialized = false;

  async ensureReady() {
    if (!this.initialized) {
      this.knowledge = await loadKnowledge();
      this.initialized = true;
    }
  }

async getResponse(text: string): Promise<ChatResponse> {
  await this.ensureReady();

  const key = normalize(text);

  // 1️⃣ INTENT MATCH (STATIC KNOWLEDGE)
  const intent = matchIntent(key);
  if (intent) {
    return {
      text: intent.response,
      confidence: 1,
      needsTraining: false
    };
  }

  // 2️⃣ EXACT LEARNED MATCH
  if (this.knowledge[key]) {
    return {
      text: this.knowledge[key],
      confidence: 1,
      needsTraining: false
    };
  }

  // 3️⃣ FUZZY LEARNED MATCH
  const { bestScore, bestAnswer } = findBestMemoryMatch(key, this.knowledge);

  if (bestScore >= CONFIDENT)
    return { text: bestAnswer!, confidence: bestScore, needsTraining: false };

  if (bestScore >= UNCERTAIN)
    return {
      text: `I might be wrong, but: "${bestAnswer}" 🤔`,
      confidence: bestScore,
      needsTraining: false
    };

  if (bestScore >= LOW)
    return {
      text: `I'm not sure, did you mean: "${bestAnswer}"? 🤔`,
      confidence: bestScore,
      needsTraining: false,
      suggestion: bestAnswer ?? undefined
    };

  // 4️⃣ UNKNOWN → TEACH
  return {
    text: "I'm not sure how to respond yet 🤔, please teach me",
    confidence: bestScore,
    needsTraining: true,
    input: text
  };
}


  async learn(inputText: string, correctResponse: string) {
    await this.ensureReady();

    const key = normalize(inputText);
    this.knowledge[key] = correctResponse;
    await saveKnowledge({ [key]: correctResponse });
  }
}

export const chatBrain = new ChatBrain();

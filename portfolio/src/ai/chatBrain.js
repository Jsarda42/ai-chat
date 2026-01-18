import { Tokenizer } from "./tokenizer";
import { loadKnowledge, saveKnowledge } from "./knowledgeStore";
import { normalize } from "./normalize";
import { wordSimilarity as similarity } from "./similarity";

class ChatBrain {
  constructor() {
    this.knowledge = loadKnowledge();
    this.tokenizer = new Tokenizer();

    // Build tokenizer vocab from knowledge
    Object.entries(this.knowledge).forEach(([input, output]) => {
      this.tokenizer.addWords(input);
      this.tokenizer.addWords(output);
    });
  }

  getResponse(text) {
    const CONFIDENT = 0.85;
    const UNCERTAIN = 0.6;
    const LOW = 0.4;
    const key = normalize(text);

    // 1️⃣ Exact memory match
    if (this.knowledge[key]) {
      return {
        text: this.knowledge[key],
        confidence: 1,
        needsTraining: false
      };
    }

    // 2️⃣ Similarity match
    let bestScore = 0;
    let bestKey = null;
    let bestAnswer = null;

    for (const knownKey in this.knowledge) {
      const score = similarity(key, knownKey);
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = this.knowledge[knownKey];
      }
    }

    if (bestScore >= CONFIDENT) {
      return {
        text: bestAnswer,
        confidence: bestScore,
        needsTraining: false
      };
    }

    if (bestScore >= UNCERTAIN) {
      return {
        text: `I might be wrong, but: "${bestAnswer}" 🤔`,
        confidence: bestScore,
        needsTraining: false
      };
    }

    if (bestScore >= LOW) {
      return {
        text: `I'm not sure, did you mean: "${bestAnswer}"? 🤔`,
        confidence: bestScore,
        needsTraining: false,
        suggestion: bestKey
      };
    }

    return {
      text: "I'm not sure how to respond yet 🤔, please teach me",
      confidence: bestScore,
      needsTraining: true,
      input: text
    };
  }

  learn(inputText, correctResponse) {
    const key = normalize(inputText);

    this.knowledge[key] = correctResponse;
    saveKnowledge(this.knowledge);

    // keep tokenizer updated
    this.tokenizer.addWords(key);
    this.tokenizer.addWords(correctResponse);
  }
}

export const chatBrain = new ChatBrain();

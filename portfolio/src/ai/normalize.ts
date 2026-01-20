export const ALIASES: Record<string, string> = {
  r: "are",
  u: "you",
  ur: "your",
  im: "i am",
  iam: "i am",
  youre: "you are",
  cant: "can not",
  dont: "do not",
  whats: "what is",
  whos: "who is",
  wats: "what is"
};

export function refersToSelf(text: string): boolean {
  return /\b(you|your|yourself|u)\b/.test(text);
}


export function normalize(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .map(word => {
      const alias = ALIASES[word];
      if (alias) return alias;

      // plural handling — SAFE
      if (word.length > 3 && word.endsWith("s")) {
        return word.slice(0, -1);
      }

      return word;
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}



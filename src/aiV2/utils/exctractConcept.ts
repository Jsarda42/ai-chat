import { normalize } from "./normalizer";

const STOP_WORDS = [
    "what", "how", "why", "when", "where", "who",
    "is", "are", "was", "were", "do", "does", "did",
    "can", "could", "would", "should", "will",
    "a", "an", "the", "to", "of", "in", "on", "for",
    "and", "or", "with"
];

const ATTRIBUTE_VERBS = [
    "be", "have", "do", "work", "invent", "sign", "eat", "change", "find", "learn"
];

function removeStopWords(tokens: string[]): string[] {
    return tokens.filter(t => !STOP_WORDS.includes(t));
}

export function extractEntityAndAttribute(text: string) {
    const normalized = normalize(text);
    const tokens = normalized.split(" ");

    // Pattern 1: "X of Y" → common for "capital of France"
    const ofIndex = tokens.indexOf("of");
    if (ofIndex > 0 && ofIndex < tokens.length - 1) {
        const attribute = tokens.slice(0, ofIndex).filter(t => !STOP_WORDS.includes(t)).join(" ");
        const entity = tokens.slice(ofIndex + 1).filter(t => !STOP_WORDS.includes(t)).join(" ");
        return { entity, attribute };
    }

    

    // Pattern 2: "Who/What/When ... verb entity?" → "Who invented the telephone?"
    const questionWordIndex = tokens.findIndex(t => ["who", "what", "when", "why", "how", "where"].includes(t));
    if (questionWordIndex === 0) {
        // find first verb after question word
        const verbIndex = tokens.findIndex(t => ATTRIBUTE_VERBS.includes(t));
        if (verbIndex > 0) {
            const attributeTokens = tokens.slice(questionWordIndex + 1, verbIndex + 1).filter(t => !STOP_WORDS.includes(t));
            const entityTokens = tokens.slice(verbIndex + 1).filter(t => !STOP_WORDS.includes(t));
            const attribute = attributeTokens.join(" ");
            const entity = entityTokens.join(" ");
            return { entity, attribute };
        }
    }

    // Pattern 3: fallback → take last noun(s) as entity, first word(s) as attribute
    const filteredTokens = removeStopWords(tokens);
    if (filteredTokens.length === 0) return { entity: null, attribute: null };
    const entity = filteredTokens[filteredTokens.length - 1]; // last word
    const attribute = filteredTokens.slice(0, filteredTokens.length - 1).join(" ") || null;
    return { entity, attribute };
}

import { normalize } from "./normalizer";

const STOP_WORDS = [
    "what", "how", "why", "when", "where", "who",
    "is", "are", "was", "were", "do", "does", "did",
    "can", "could", "would", "should", "will",
    "a", "an", "the", "to", "of", "in", "on", "for",
    "and", "or", "with"
];

function extractEntityFromOfPhrase(concept: string): string {
    if (!concept.includes(" of ")) return concept;

    const parts = concept.split(" of ");
    return parts[parts.length - 1];
}


export function extractConcept(text: string): string | null {
    const normalized = normalize(text);
    const entityConcept = extractEntityFromOfPhrase(normalized);
    const tokens = entityConcept.split(" ");

    const filtered = tokens.filter(
        t => !STOP_WORDS.includes(t)
    );
     if (filtered.length === 0) return null;
    const concept = filtered.join(" ");

    if (
        concept.startsWith("i ") ||
        concept.includes(" i ") ||
        concept.startsWith("you ") ||
        concept.includes(" you ") ||
        concept.split(" ").length > 3
    ) {
        return null;
    }

    return filtered.length > 1 ? filtered[0] : filtered[0];
}
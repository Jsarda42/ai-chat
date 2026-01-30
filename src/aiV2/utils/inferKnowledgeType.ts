
import { KnowledgeType } from "../types/knowledgeType";

export function inferKnowledgeType(
    params: { shape: string; attribute: string | null }
): KnowledgeType | null {
    const { shape, attribute } = params;
    if (!attribute) return null;

    if (shape === "number" && attribute === "lifespan") {
        return "numeric_range";
    }
    if (shape === "definition") {
        return "definition";
    }
    if (shape === "fact") {
        return "single_fact";
    }
    return "boolean";
}

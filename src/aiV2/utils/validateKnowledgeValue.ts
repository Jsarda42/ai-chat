import { KnowledgeType } from "../types/knowledgeType";

function validateSingleFact(value: string): ValidationResult {
  if (value.length < 2) {
    return { valid: false, reason: "Fact too short" };
  }

  if (value.includes("?")) {
    return { valid: false, reason: "Fact cannot be a question" };
  }

  return { valid: true } as const;
}

function validateDefinition(value: string)  : ValidationResult {
  if (value.length < 10) {
    return { valid: false, reason: "Definition too short" };
  }

  return { valid: true } as const;
}

function validateNumericRange(value: string) : ValidationResult {
  // Accept patterns like:
  // "3-5 years", "up to 10 years", "10 years", "2–3 years"

  const hasNumber = /\d/.test(value);
  const hasRangeWord =
    value.includes("-") ||
    value.includes("to") ||
    value.includes("up to");

  if (!hasNumber) {
    return { valid: false, reason: "No number found" };
  }

  return { valid: true } as const;
}

function validateBoolean(value: string) : ValidationResult {
  const allowed = ["yes", "no", "true", "false"];

  if (!allowed.includes(value)) {
    return {
      valid: false,
      reason: "Boolean must be yes/no or true/false",
    };
  }

  return { valid: true } as const;
}


type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validateKnowledgeValue(
  type: KnowledgeType,
  value: string
): ValidationResult {

  const trimmed = value.trim().toLowerCase();

  if (!trimmed) {
    return { valid: false, reason: "Empty value" };
  }

  switch (type) {
    case "single_fact":
      return validateSingleFact(trimmed);

    case "definition":
      return validateDefinition(trimmed);

    case "numeric_range":
      return validateNumericRange(trimmed);

    case "boolean":
      return validateBoolean(trimmed);

    default:
      return { valid: false, reason: "Unknown knowledge type" };
  }
}

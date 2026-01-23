type Attribute = string;

const ATTRIBUTE_SYNONYMS: Record<Attribute, string[]> = {
  population: [
    "how many people",
    "number of people",
    "people live",
    "inhabitants",
    "population",
  ],

  capital: [
    "capital",
    "capital city",
  ],

  area: [
    "size",
    "area",
    "surface",
  ],

  currency: [
    "currency",
    "money",
    "money used",
  ],

  president: [
    "president",
    "leader",
    "head of state",
  ],
};

export function mapAttributeSynonym(raw: string | null): string | null {
  if (!raw) return null;

  const text = raw.toLowerCase();

  for (const [canonical, phrases] of Object.entries(ATTRIBUTE_SYNONYMS)) {
    for (const phrase of phrases) {
      if (text.includes(phrase)) {
        return canonical;
      }
    }
  }

  return raw;
}

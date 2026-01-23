export function normalizePossessive(text: string): string {
  return text.replace(
    /\b([a-z]+)'s\s+([a-z]+)/g,
    "$2 of $1"
  );
}

export function normalize(text: string): string {
    if (!text) return "";
    return text
    // convert to lowercase
      .toLowerCase()
    // remove non-alphanumeric characters except spaces
      .trim()
    // remove leading/trailing whitespace
      .replace(/\s+/g, " ")
    // remove punctuation
      .replace(/[.,!?;:]/g, "");
}





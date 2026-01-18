export function normalize(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\b(\w+)s\b/g, "$1") // remove plural 's'
    .replace(/\s+/g, " ")
    .trim();
}

export function wordSimilarity(a, b) {
  const setA = new Set(a.split(" "));
  const setB = new Set(b.split(" "));

  const intersection = [...setA].filter(x => setB.has(x));
  const union = new Set([...setA, ...setB]);

  return union.size === 0 ? 0 : intersection.length / union.size;
}

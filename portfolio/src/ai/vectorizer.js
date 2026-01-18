export function vectorize(tokenIds, vocabSize) {
  const vector = new Array(vocabSize).fill(0);

  tokenIds.forEach(id => {
    vector[id] += 1;
  });

  return vector;
}


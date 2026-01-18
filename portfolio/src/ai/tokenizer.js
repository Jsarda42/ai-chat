export class Tokenizer {
  constructor() {
    this.wordToId = {};
    this.idToWord = {};
    this.nextId = 0;
    this.unkToken = "<UNK>";
    this.addWord(this.unkToken);
  }

  addWord(word) {
    if (!(word in this.wordToId)) {
      const id = this.nextId++;
      this.wordToId[word] = id;
      this.idToWord[id] = word;
    }
  }

  addWords(text) {
    const words = text.toLowerCase().split(/\s+/);
    words.forEach(word => this.addWord(word));
  }

  encode(text) {
    const words = text.toLowerCase().split(/\s+/);
    return words.map(
      word => this.wordToId[word] ?? this.wordToId[this.unkToken]
    );
  }

  vocabSize() {
    return this.nextId;
  }
}

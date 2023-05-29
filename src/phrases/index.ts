export class Phrases {
  private readonly phrases: string[];
  constructor(phrases: string[]) {
    this.phrases = phrases;
  }
  getPhrase(index: number) {
    return this.phrases[index];
  }
}

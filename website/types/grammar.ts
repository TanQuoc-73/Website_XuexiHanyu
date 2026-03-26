export interface GrammarPoint {
  id: string;
  title: string;
  titleZh: string;
  hskLevel: number;
  pattern: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface GrammarExample {
  chinese: string;
  pinyin: string;
  english: string;
}

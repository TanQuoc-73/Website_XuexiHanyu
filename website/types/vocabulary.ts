export interface VocabWord {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  hskLevel: number;
  category: string;
  exampleSentence?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  audioUrl?: string;
  strokeOrder?: string[];
}

export interface VocabCategory {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  wordCount: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Sentence {
  id: number;
  sentence: string;
  pinyin: string;
  translationVi: string;
  translationEn: string;
}

export interface VocabWord {
  id: number;
  hanzi: string;
  pinyin: string;
  meaningVi: string;
  meaningEn: string;
  hskLevel: number;
  category: Category;
  sentences: Sentence[];
  audioUrl?: string;
  strokeOrder?: string[];
}

export interface VocabCategory {
  id: number;
  name: string;
  wordCount?: number;
}

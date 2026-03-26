export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HskLevelInfo {
  level: HskLevel;
  name: string;
  description: string;
  wordCount: number;
  color: string;
}

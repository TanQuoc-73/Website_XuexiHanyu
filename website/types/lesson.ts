export interface LessonStep {
  id: string;
  type: "vocabulary" | "grammar" | "dialogue" | "exercise";
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  hskLevel: number;
  order: number;
  steps: LessonStep[];
  estimatedMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  currentHskLevel: number;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  lessonsCompleted: number;
  wordsLearned: number;
  totalStudyMinutes: number;
  streakDays: number;
  lastStudyDate: string;
  lessonProgress: Record<string, number>;
}

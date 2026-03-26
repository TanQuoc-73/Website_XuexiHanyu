import { api } from "@/lib/api";
import type { Lesson } from "@/types/lesson";

export const lessonService = {
  getAll: () => api.get<Lesson[]>("/lessons"),
  getById: (id: string) => api.get<Lesson>(`/lessons/${encodeURIComponent(id)}`),
  getByHskLevel: (level: number) => api.get<Lesson[]>(`/lessons?hskLevel=${level}`),
};

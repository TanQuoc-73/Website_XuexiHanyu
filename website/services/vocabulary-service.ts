import { api } from "@/lib/api";
import type { VocabWord, VocabCategory } from "@/types/vocabulary";

export const vocabularyService = {
  getAll: (params?: { hskLevel?: number; category?: string }) => {
    // Current backend words endpoint is /api/words
    if (params?.hskLevel) {
      return api.get<VocabWord[]>(`/words/hsk/${params.hskLevel}`);
    }
    return api.get<VocabWord[]>("/words");
  },
  getById: (id: number) => api.get<VocabWord>(`/words/${id}`),
  getCategories: () => api.get<VocabCategory[]>("/words/categories"), // Note: need to implement this in backend
  search: (keyword: string) => api.get<VocabWord[]>(`/words/search?q=${encodeURIComponent(keyword)}`),
};

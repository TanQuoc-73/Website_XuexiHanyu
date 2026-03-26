import { api } from "@/lib/api";
import type { VocabWord, VocabCategory } from "@/types/vocabulary";

export const vocabularyService = {
  getAll: (params?: { hskLevel?: number; category?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.hskLevel) searchParams.set("hskLevel", String(params.hskLevel));
    if (params?.category) searchParams.set("category", params.category);
    const query = searchParams.toString();
    return api.get<VocabWord[]>(`/vocabulary${query ? `?${query}` : ""}`);
  },
  getById: (id: string) => api.get<VocabWord>(`/vocabulary/${encodeURIComponent(id)}`),
  getCategories: () => api.get<VocabCategory[]>("/vocabulary/categories"),
  search: (keyword: string) => api.get<VocabWord[]>(`/vocabulary/search?q=${encodeURIComponent(keyword)}`),
};

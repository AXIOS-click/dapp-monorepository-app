import { create } from "zustand";

interface UsersFiltersState {
  page: number;
  searchQuery: string;
  isAnyFilterActive: boolean;
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useUsersFiltersStore = create<UsersFiltersState>((set) => ({
  page: 1,
  searchQuery: "",
  isAnyFilterActive: false,
  setPage: (page) => set({ page }),
  setSearchQuery: (query) =>
    set((state) => ({
      searchQuery: query,
      isAnyFilterActive: !!query || state.isAnyFilterActive,
    })),
  resetFilters: () =>
    set({ page: 1, searchQuery: "", isAnyFilterActive: false }),
}));

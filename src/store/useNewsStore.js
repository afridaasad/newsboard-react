import { create } from "zustand";

const useNewsStore = create((set) => ({
  bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),
  history: JSON.parse(localStorage.getItem("history") || "[]"),

  addBookmark: (article) =>
    set((state) => {
      const updated = [
        ...state.bookmarks,
        { ...article, bookmarkedAt: Date.now() }
      ];

      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return { bookmarks: updated };
    }),

  removeBookmark: (id) =>
    set((state) => {
      const updated = state.bookmarks.filter(a => a.id !== id);

      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return { bookmarks: updated };
    }),

  addHistory: (entry) =>
    set((state) => {
      const updated = [entry, ...state.history];

      localStorage.setItem("history", JSON.stringify(updated));
      return { history: updated };
    }),

  clearHistory: () =>
    set(() => {
      localStorage.setItem("history", JSON.stringify([]));
      return { history: [] };
    }),
}));

export default useNewsStore;
import { create } from "zustand";

// Визначаємо типи для стану
export type MediaType = "movie" | "tv";

// Розділяємо категорії для фільмів та серіалів для більшої безпеки типів
export type MovieCategory =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";
export type TVShowCategory =
  | "airing_today"
  | "popular"
  | "top_rated"
  | "on_the_air";

interface MediaState {
  mediaType: MediaType;
  movieCategory: MovieCategory;
  tvCategory: TVShowCategory;
  setMediaType: (type: MediaType) => void;
  setMovieCategory: (category: MovieCategory) => void;
  setTVCategory: (category: TVShowCategory) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  // Початковий стан
  mediaType: "movie",
  movieCategory: "popular",
  tvCategory: "popular",

  // Actions
  setMediaType: (type) => set({ mediaType: type }),
  setMovieCategory: (category) => set({ movieCategory: category }),
  setTVCategory: (category) => set({ tvCategory: category }),
}));

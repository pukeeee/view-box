import { tmdbApi } from "@/lib/api";
import {
  TVShow,
  tmdbTVShowResponseSchema, // Імпортуємо схему
} from "@/types/schemas";

/**
 * Отримує список серіалів, що в тренді.
 * @returns Масив серіалів.
 */
export const getTrendingTVShows = async (): Promise<TVShow[]> => {
  try {
    const data = await tmdbApi("trending/tv/week", tmdbTVShowResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список серіалів з найвищим рейтингом.
 * @returns Масив серіалів.
 */
export const getTopRatedTVShows = async (): Promise<TVShow[]> => {
  try {
    const data = await tmdbApi("tv/top_rated", tmdbTVShowResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список популярних серіалів.
 * @returns Масив серіалів.
 */
export const getPopularTV = async (): Promise<TVShow[]> => {
  try {
    const data = await tmdbApi("tv/popular", tmdbTVShowResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список серіалів, що зараз в ефірі.
 * @returns Масив серіалів.
 */
export const getOnTheAirTV = async (): Promise<TVShow[]> => {
  try {
    const data = await tmdbApi("tv/on_the_air", tmdbTVShowResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список серіалів, що виходять сьогодні.
 * @returns Масив серіалів.
 */
export const getAiringTodayTV = async (): Promise<TVShow[]> => {
  try {
    const data = await tmdbApi("tv/airing_today", tmdbTVShowResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

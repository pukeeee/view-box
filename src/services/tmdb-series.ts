import { unstable_cache } from "next/cache";
import { tmdbApi } from "@/lib/api";
import {
  TVShow,
  tmdbTVShowResponseSchema, // Імпортуємо схему
} from "@/types/schemas";

/**
 * Отримує список серіалів, що в тренді.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив серіалів.
 */
export const getTrendingTVShows = unstable_cache(
  async (page: number = 1): Promise<TVShow[]> => {
    try {
      const data = await tmdbApi("trending/tv/week", tmdbTVShowResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["trending-tv-shows"],
  {
    revalidate: 43200, // 12 годин
    tags: ["tv", "trending"],
  },
);

/**
 * Отримує список серіалів з найвищим рейтингом.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив серіалів.
 */
export const getTopRatedTVShows = unstable_cache(
  async (page: number = 1): Promise<TVShow[]> => {
    try {
      const data = await tmdbApi("tv/top_rated", tmdbTVShowResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["top-rated-tv-shows"],
  {
    revalidate: 43200, // 12 годин
    tags: ["tv", "top_rated"],
  },
);

/**
 * Отримує список популярних серіалів.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив серіалів.
 */
export const getPopularTV = unstable_cache(
  async (page: number = 1): Promise<TVShow[]> => {
    try {
      const data = await tmdbApi("tv/popular", tmdbTVShowResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["popular-tv"],
  {
    revalidate: 43200, // 12 годин
    tags: ["tv", "popular"],
  },
);

/**
 * Отримує список серіалів, що зараз в ефірі.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив серіалів.
 */
export const getOnTheAirTV = unstable_cache(
  async (page: number = 1): Promise<TVShow[]> => {
    try {
      const data = await tmdbApi("tv/on_the_air", tmdbTVShowResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["on-the-air-tv"],
  {
    revalidate: 43200, // 12 годин
    tags: ["tv", "on_the_air"],
  },
);

/**
 * Отримує список серіалів, що виходять сьогодні.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив серіалів.
 */
export const getAiringTodayTV = unstable_cache(
  async (page: number = 1): Promise<TVShow[]> => {
    try {
      const data = await tmdbApi("tv/airing_today", tmdbTVShowResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["airing-today-tv"],
  {
    revalidate: 43200, // 12 годин
    tags: ["tv", "airing_today"],
  },
);
import { unstable_cache } from "next/cache";
import { tmdbApi } from "@/lib/api";
import {
  Movie,
  tmdbMovieResponseSchema,
} from "@/types/schemas";

/**
 * Отримує список фільмів, що в тренді.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив фільмів.
 */
export const getTrendingMovies = unstable_cache(
  async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await tmdbApi("trending/movie/week", tmdbMovieResponseSchema, {
        page,
      });
      return data.results;
    } catch {
      return [];
    }
  },
  ["trending-movies"],
  {
    revalidate: 43200, // 12 годин
    tags: ["movies", "trending"],
  },
);

/**
 * Отримує список фільмів, що зараз у прокаті.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив фільмів.
 */
export const getNowPlayingMovies = unstable_cache(
  async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await tmdbApi("movie/now_playing", tmdbMovieResponseSchema, {
        page,
      });
      return data.results;
    } catch {
      return [];
    }
  },
  ["now-playing-movies"],
  {
    revalidate: 43200, // 12 годин
    tags: ["movies", "now_playing"],
  },
);

/**
 * Отримує список популярних фільмів.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив фільмів.
 */
export const getPopularMovies = unstable_cache(
  async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await tmdbApi("movie/popular", tmdbMovieResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["popular-movies"],
  {
    revalidate: 43200, // 12 годин
    tags: ["movies", "popular"],
  },
);

/**
 * Отримує список фільмів з найвищим рейтингом.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив фільмів.
 */
export const getTopRatedMovies = unstable_cache(
  async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await tmdbApi("movie/top_rated", tmdbMovieResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["top-rated-movies"],
  {
    revalidate: 43200, // 12 годин
    tags: ["movies", "top_rated"],
  },
);

/**
 * Отримує список фільмів, що скоро вийдуть.
 * @param {number} page - Номер сторінки для пагінації.
 * @returns Масив фільмів.
 */
export const getUpcomingMovies = unstable_cache(
  async (page: number = 1): Promise<Movie[]> => {
    try {
      const data = await tmdbApi("movie/upcoming", tmdbMovieResponseSchema, { page });
      return data.results;
    } catch {
      return [];
    }
  },
  ["upcoming-movies"],
  {
    revalidate: 43200, // 12 годин
    tags: ["movies", "upcoming"],
  },
);

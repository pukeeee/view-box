import { tmdbApi } from "@/lib/api";
import {
  Movie,
  tmdbMovieResponseSchema,
} from "@/types/schemas";

/**
 * Отримує список фільмів, що в тренді.
 * @returns Масив фільмів.
 */
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbApi("trending/movie/week", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список фільмів, що зараз у прокаті.
 * @returns Масив фільмів.
 */
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbApi("movie/now_playing", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список популярних фільмів.
 * @returns Масив фільмів.
 */
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbApi("movie/popular", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список фільмів з найвищим рейтингом.
 * @returns Масив фільмів.
 */
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbApi("movie/top_rated", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};

/**
 * Отримує список фільмів, що скоро вийдуть.
 * @returns Масив фільмів.
 */
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbApi("movie/upcoming", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    return [];
  }
};
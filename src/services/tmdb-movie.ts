import { tmdbApi } from "@/lib/api";
import {
  Movie,
  tmdbMovieResponseSchema, // Імпортуємо схему
} from "@/types/schemas";

/**
 * Отримує список фільмів, що в тренді.
 * @returns Масив фільмів.
 */
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    // Передаємо схему для валідації
    const data = await tmdbApi("trending/movie/week", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    // Помилка вже залогована в tmdbApi, тому повертаємо порожній масив
    return [];
  }
};

/**
 * Отримує список фільмів, що зараз у прокаті.
 * @returns Масив фільмів.
 */
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    // Передаємо схему для валідації
    const data = await tmdbApi("movie/now_playing", tmdbMovieResponseSchema);
    return data.results;
  } catch {
    // Помилка вже залогована в tmdbApi
    return [];
  }
};

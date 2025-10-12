import { z } from 'zod';

// Схема для сутності "Фільм"
export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// Схема для сутності "Серіал"
export const tvShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  first_air_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// Схема для відповіді API зі списком фільмів
export const tmdbMovieResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

// Схема для відповіді API зі списком серіалів
export const tmdbTVShowResponseSchema = z.object({
  page: z.number(),
  results: z.array(tvShowSchema),
  total_pages: z.number(),
  total_results: z.number(),
});


// Автоматично виводимо TypeScript типи зі схем
export type Movie = z.infer<typeof movieSchema>;
export type TVShow = z.infer<typeof tvShowSchema>;
export type TmdbMovieResponse = z.infer<typeof tmdbMovieResponseSchema>;
export type TmdbTVShowResponse = z.infer<typeof tmdbTVShowResponseSchema>;

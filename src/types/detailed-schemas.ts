import { z } from "zod";

// Схема для жанру
export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Схема для компанії-виробника
export const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

// Схема для країни виробництва
export const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

// Схема для мови
export const spokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

// Схема для актора
export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number(),
});

// Схема для члена команди
export const crewMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
  department: z.string(),
  profile_path: z.string().nullable(),
});

// Схема для кредитів
export const creditsSchema = z.object({
  cast: z.array(castMemberSchema),
  crew: z.array(crewMemberSchema),
});

// Схема для відео (трейлери)
export const videoSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
  official: z.boolean(),
});

export const videosSchema = z.object({
  results: z.array(videoSchema),
});

// Схема для зображення
export const imageSchema = z.object({
  file_path: z.string(),
  width: z.number(),
  height: z.number(),
  vote_average: z.number().optional(),
});

export const imagesSchema = z.object({
  backdrops: z.array(imageSchema),
  posters: z.array(imageSchema),
  logos: z.array(imageSchema).optional(),
});

// Схема для рекомендацій
export const recommendationSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable(),
  vote_average: z.number(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
});

export const recommendationsSchema = z.object({
  results: z.array(recommendationSchema),
});

// Детальна схема для фільму
export const movieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  budget: z.number(),
  revenue: z.number(),
  status: z.string(),
  tagline: z.string().nullable(),
  genres: z.array(genreSchema),
  production_companies: z.array(productionCompanySchema),
  production_countries: z.array(productionCountrySchema),
  spoken_languages: z.array(spokenLanguageSchema),
  homepage: z.string().nullable(),
  imdb_id: z.string().nullable(),
});

// Детальна схема для серіалу
export const tvDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  original_name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  first_air_date: z.string(),
  last_air_date: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
  status: z.string(),
  tagline: z.string().nullable(),
  genres: z.array(genreSchema),
  production_companies: z.array(productionCompanySchema),
  production_countries: z.array(productionCountrySchema),
  spoken_languages: z.array(spokenLanguageSchema),
  homepage: z.string().nullable(),
  number_of_seasons: z.number(),
  number_of_episodes: z.number(),
  episode_run_time: z.array(z.number()),
  networks: z.array(productionCompanySchema),
  created_by: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      profile_path: z.string().nullable(),
    }),
  ),
});

// Схема для сезону
export const seasonSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  season_number: z.number(),
  episode_count: z.number(),
  air_date: z.string().nullable(),
  poster_path: z.string().nullable(),
});

// Експорт типів
export type Genre = z.infer<typeof genreSchema>;
export type ProductionCompany = z.infer<typeof productionCompanySchema>;
export type ProductionCountry = z.infer<typeof productionCountrySchema>;
export type SpokenLanguage = z.infer<typeof spokenLanguageSchema>;
export type CastMember = z.infer<typeof castMemberSchema>;
export type CrewMember = z.infer<typeof crewMemberSchema>;
export type Credits = z.infer<typeof creditsSchema>;
export type Video = z.infer<typeof videoSchema>;
export type Videos = z.infer<typeof videosSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Images = z.infer<typeof imagesSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type Recommendations = z.infer<typeof recommendationsSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type TVDetails = z.infer<typeof tvDetailsSchema>;
export type Season = z.infer<typeof seasonSchema>;

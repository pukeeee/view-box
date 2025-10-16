import { tmdbApi } from "@/lib/api";
import {
  MovieDetails,
  TVDetails,
  Credits,
  Videos,
  Images,
  Recommendations,
  movieDetailsSchema,
  tvDetailsSchema,
  creditsSchema,
  videosSchema,
  imagesSchema,
  recommendationsSchema,
} from "@/types/detailed-schemas";

/**
 * Отримує детальну інформацію про фільм
 */
export const getMovieDetails = async (
  id: number,
): Promise<MovieDetails | null> => {
  try {
    const data = await tmdbApi(`movie/${id}`, movieDetailsSchema);
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie details for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує акторів та команду фільму
 */
export const getMovieCredits = async (id: number): Promise<Credits | null> => {
  try {
    const data = await tmdbApi(`movie/${id}/credits`, creditsSchema);
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie credits for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує відео (трейлери) фільму
 */
export const getMovieVideos = async (id: number): Promise<Videos | null> => {
  try {
    const data = await tmdbApi(`movie/${id}/videos`, videosSchema);
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie videos for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує зображення фільму
 */
export const getMovieImages = async (id: number): Promise<Images | null> => {
  try {
    const data = await tmdbApi(`movie/${id}/images`, imagesSchema, {
      include_image_language: "uk,en,null",
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie images for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує рекомендовані фільми
 */
export const getMovieRecommendations = async (
  id: number,
): Promise<Recommendations | null> => {
  try {
    const data = await tmdbApi(
      `movie/${id}/recommendations`,
      recommendationsSchema,
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie recommendations for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує детальну інформацію про серіал
 */
export const getTVDetails = async (id: number): Promise<TVDetails | null> => {
  try {
    const data = await tmdbApi(`tv/${id}`, tvDetailsSchema);
    return data;
  } catch (error) {
    console.error(`Failed to fetch TV details for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує акторів та команду серіалу
 */
export const getTVCredits = async (id: number): Promise<Credits | null> => {
  try {
    const data = await tmdbApi(`tv/${id}/credits`, creditsSchema);
    return data;
  } catch (error) {
    console.error(`Failed to fetch TV credits for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує відео (трейлери) серіалу
 */
export const getTVVideos = async (id: number): Promise<Videos | null> => {
  try {
    const data = await tmdbApi(`tv/${id}/videos`, videosSchema);
    return data;
  } catch (error) {
    console.error(`Failed to fetch TV videos for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує зображення серіалу
 */
export const getTVImages = async (id: number): Promise<Images | null> => {
  try {
    const data = await tmdbApi(`tv/${id}/images`, imagesSchema, {
      include_image_language: "uk,en,null",
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch TV images for ID ${id}:`, error);
    return null;
  }
};

/**
 * Отримує рекомендовані серіали
 */
export const getTVRecommendations = async (
  id: number,
): Promise<Recommendations | null> => {
  try {
    const data = await tmdbApi(
      `tv/${id}/recommendations`,
      recommendationsSchema,
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch TV recommendations for ID ${id}:`, error);
    return null;
  }
};

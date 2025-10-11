const TMDB_API_KEY = process.env.TMDB_API_KEY;
import { LANGUAGE, BASE_URL } from "@/config/constants";

export const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}trending/movie/week?language=${LANGUAGE}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return [];
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=${LANGUAGE}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return [];
  }
};

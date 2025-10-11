const TMDB_API_KEY = process.env.TMDB_API_KEY;
import { LANGUAGE, BASE_URL } from "@/config/constants";

export const getTrendingSeries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}trending/tv/week?language=${LANGUAGE}`,
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

export const getTopRatedSeries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/top_rated?language=${LANGUAGE}`,
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

export const getPopularTV = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?language=${LANGUAGE}`,
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

export const getOnTheAirTV = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/on_the_air?language=${LANGUAGE}`,
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

export const getAiringTodayTV = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/airing_today?language=${LANGUAGE}`,
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

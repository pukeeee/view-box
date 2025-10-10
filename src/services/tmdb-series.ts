const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";
const LANGUAGE = "en-US";

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

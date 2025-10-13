import { BASE_URL, LANGUAGE } from "@/config/constants";
import { env } from "@/env";
import { z } from "zod";

const TMDB_API_KEY = env.TMDB_API_KEY;

type QueryParams = {
  [key: string]: string | number | boolean;
};

export const tmdbApi = async <T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  params: QueryParams = {},
): Promise<z.infer<T>> => {
  const query = new URLSearchParams({
    language: LANGUAGE,
    ...params,
  }).toString();

  const url = `${BASE_URL}${endpoint}?${query}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const parsedData = schema.safeParse(data);

    if (!parsedData.success) {
      console.error(
        `❌ [TMDB API Validation Failed] for /${endpoint}:`,
        z.treeifyError(parsedData.error),
      );
      throw new Error("API response validation failed.");
    }

    return parsedData.data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("fetch")) {
      console.error(`❌ [TMDB API Fetch Error] for /${endpoint}:`, error);
    }
    // Інші помилки (валідації, відповіді) вже логуються вище
    throw error;
  }
};

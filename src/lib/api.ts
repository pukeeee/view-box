import { BASE_URL, LANGUAGE } from "@/config/constants";
import { env } from "@/env";
import { z } from "zod";

const TMDB_API_KEY = env.TMDB_API_KEY;

type QueryParams = {
  [key: string]: string | number | boolean;
};

/**
 * Універсальний клієнт для роботи з API The Movie Database.
 * @param endpoint - Кінцева точка API.
 * @param schema - Zod-схема для валідації відповіді.
 * @param params - Додаткові параметри запиту.
 * @returns — Повертає провалідовані та типізовані дані.
 * @throws — Викидає помилку, якщо запит або валідація не вдалися.
 */
export const tmdbApi = async <T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  params: QueryParams = {}
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
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Валідуємо дані за допомогою переданої схеми
    const parsedData = schema.safeParse(data);

    if (!parsedData.success) {
      console.error(
        "❌ API response validation failed:",
        z.treeifyError(parsedData.error)
      );
      throw new Error("API response validation failed.");
    }

    return parsedData.data;
  } catch (error) {
    if (error instanceof Error && error.message !== "API response validation failed.") {
      console.error(`Failed to fetch data from endpoint: ${endpoint}`, error);
    }
    throw error;
  }
};
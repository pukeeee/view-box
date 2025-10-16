import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/services/tmdb-movie";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * @constant CategorySchema
 * @description Схема для валідації динамічного параметра [category].
 */
const CategorySchema = z.enum([
  "popular",
  "top_rated",
  "now_playing",
  "upcoming",
]);

/**
 * GET-хендлер для отримання списку фільмів за категорією.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    const awaitedParams = await params;

    // Крок 1: Валідація динамічного параметра `category`.
    const validationResult = CategorySchema.safeParse(awaitedParams.category);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: `Invalid category: '${awaitedParams.category}'. Must be one of [${CategorySchema.options.join(", ")}]`,
        },
        { status: 400 },
      );
    }

    const category = validationResult.data;

    // Крок 2: Отримання та валідація query-параметра 'page'.
    const pageParam = req.nextUrl.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number. Must be a positive integer." },
        { status: 400 },
      );
    }

    // Крок 3: Виклик відповідного сервісу з урахуванням сторінки.
    let movies;
    switch (category) {
      case "popular":
        movies = await getPopularMovies(page);
        break;
      case "top_rated":
        movies = await getTopRatedMovies(page);
        break;
      case "now_playing":
        movies = await getNowPlayingMovies(page);
        break;
      case "upcoming":
        movies = await getUpcomingMovies(page);
        break;
    }
    // Крок 4: Успішна відповідь.
    return NextResponse.json(movies);
  } catch (error) {
    // Обробка помилок.
    console.error(`[API /movie/[category]] Failed to process request:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/services/tmdb-movie";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  // Тип params тепер обгорнутий у Promise
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    // Спочатку "очікуємо" на параметри
    const { category } = await params;

    let movies;
    switch (category) {
      case "popular":
        movies = await getPopularMovies();
        break;
      case "top_rated":
        movies = await getTopRatedMovies();
        break;
      case "now_playing":
        movies = await getNowPlayingMovies();
        break;
      case "upcoming":
        movies = await getUpcomingMovies();
        break;
      default:
        return new NextResponse(`Invalid category: ${category}`, {
          status: 400,
        });
    }
    return NextResponse.json(movies);
  } catch (error) {
    console.error(`Failed to fetch movies:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

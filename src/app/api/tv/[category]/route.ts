import {
  getAiringTodayTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTVShows,
} from "@/services/tmdb-series";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  // Тип params тепер обгорнутий у Promise
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    // Спочатку "очікуємо" на параметри
    const { category } = await params;

    let tvShows;
    switch (category) {
      case "airing_today":
        tvShows = await getAiringTodayTV();
        break;
      case "on_the_air":
        tvShows = await getOnTheAirTV();
        break;
      case "popular":
        tvShows = await getPopularTV();
        break;
      case "top_rated":
        tvShows = await getTopRatedTVShows();
        break;
      default:
        return new NextResponse(`Invalid category: ${category}`, {
          status: 400,
        });
    }
    return NextResponse.json(tvShows);
  } catch (error) {
    console.error(`Failed to fetch TV shows:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

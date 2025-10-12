import { getTrendingMovies, getNowPlayingMovies } from "@/services/tmdb-movie";
import { getTopRatedTVShows } from "@/services/tmdb-series";
import MoviesCarousel from "@/components/features/MoviesCarousel";
import HeroSlider from "@/components/features/HeroSlider";
import TVShowsCarousel from "@/components/features/TVShowsCarousel";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();
  const nowPlayingMovies = await getNowPlayingMovies();
  const topRatedSeries = await getTopRatedTVShows();

  return (
    <main>
      <HeroSlider movies={nowPlayingMovies} />

      <div className="p-8 pt-12">
        {/*<h1 className="text-2xl font-bold mb-4 text-dracula-purple">ViewBox</h1>*/}

        <h2 className="text-xl font-semibold mb-4 text-dracula-pink">
          Trending Movies
        </h2>
        <MoviesCarousel movies={trendingMovies} />

        <h2 className="text-xl font-semibold mb-4 text-dracula-pink">
          Top Rated TV shows
        </h2>
        <TVShowsCarousel tvShows={topRatedSeries} />
      </div>
    </main>
  );
}

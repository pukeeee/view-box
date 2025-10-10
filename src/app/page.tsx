import { getTrendingMovies, getNowPlayingMovies } from "@/services/tmdb-movie";
import { getTopRatedSeries } from "@/services/tmdb-series";
import MoviesCarousel from "@/components/MoviesCarousel";
import HeroSlider from "@/components/HeroSlider";
import TVShowsCarousel from "@/components/TVShowsCarousel";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();
  const nowPlayingMovies = await getNowPlayingMovies();
  const topRatedSeries = await getTopRatedSeries();

  return (
    <main>
      <HeroSlider movies={nowPlayingMovies} />

      <div className="p-8 pt-12">
        {/*<h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--dracula-purple)' }}>ViewBox</h1>*/}

        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--dracula-pink)" }}
        >
          Trending Movies
        </h2>
        <MoviesCarousel movies={trendingMovies} />

        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--dracula-pink)" }}
        >
          Top Rated TV shows
        </h2>
        <TVShowsCarousel tvShows={topRatedSeries} />
      </div>
    </main>
  );
}

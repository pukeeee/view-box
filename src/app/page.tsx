import { getTrendingMovies, getNowPlayingMovies } from "@/services/tmdb";
import MoviesCarousel from "@/components/MoviesCarousel";
import HeroSlider from "@/components/HeroSlider";


export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();
  const nowPlayingMovies = await getNowPlayingMovies();

  return (
    <main>


      <HeroSlider movies={nowPlayingMovies} />

      <div className="p-4">
        {/*<h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--dracula-purple)' }}>ViewBox</h1>*/}

        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--dracula-pink)" }}
        >
          Trending Movies
        </h2>
        <MoviesCarousel movies={trendingMovies} />
      </div>
    </main>
  );
}

import { getTrendingMovies } from "@/services/tmdb";
import MoviesCarousel from "@/components/MoviesCarousel";
import HeroSlider from "@/components/HeroSlider";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();

  console.log(trendingMovies);

  return (
    <main>
      <HeroSlider movies={trendingMovies} />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ViewBox</h1>

        <h2 className="text-xl font-semibold mb-4">Trending Movies</h2>
        <MoviesCarousel movies={trendingMovies} />
      </div>
    </main>
  );
}

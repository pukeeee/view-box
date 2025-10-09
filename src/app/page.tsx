import { getTrendingMovies } from "@/services/tmdb";
import { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();

  console.log(trendingMovies);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">ViewBox</h1>
      <h2 className="text-xl font-semibold mb-4">Trending Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {trendingMovies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

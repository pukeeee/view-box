import { getTrendingMovies } from "@/services/tmdb";
import { Movie } from "@/types";

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();

  console.log(trendingMovies);

  return (
    <main>
      <h1>ViewBox</h1>
      <h2>Trending Movies</h2>
      <ul>
        {trendingMovies.map((movie: Movie) => (
          <li key={movie.id}> {movie.title}</li>
        ))}
      </ul>
    </main>
  );
}

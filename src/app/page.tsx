import { getTrendingMovies, getNowPlayingMovies } from "@/services/tmdb-movie";
import { getTrendingTVShows } from "@/services/tmdb-series";
import HeroSlider from "@/components/features/HeroSlider";
import TrendingSection from "@/components/features/TrendingSection";
import MediaSection from "@/components/features/MediaSection";
import Footer from "@/components/layout/Footer";

export default async function HomePage() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const trendingMovies = await getTrendingMovies();
  const trendingTVShows = await getTrendingTVShows();

  return (
    <main>
      <HeroSlider movies={nowPlayingMovies} />

      <TrendingSection
        trendingMovies={trendingMovies}
        trendingTVShows={trendingTVShows}
      />

      <MediaSection id="media-section" />

      <Footer />
    </main>
  );
}

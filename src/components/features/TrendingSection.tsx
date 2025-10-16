import { Movie, TVShow } from "@/types/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoviesCarousel from "./MoviesCarousel";
import TVShowsCarousel from "./TVShowsCarousel";

interface Props {
  trendingMovies: Movie[];
  trendingTVShows: TVShow[];
}

const TrendingSection = ({ trendingMovies, trendingTVShows }: Props) => {
  // Спільні класи для кнопок-табів, щоб уникнути повторення
  const triggerStyles =
    "text-lg hover:text-gray-300 rounded-none bg-transparent p-0 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple";

  return (
    <section id="trending-section" data-scroll-section className="py-8 pt-12">
      <Tabs defaultValue="movies" className="w-full">
        <div className="px-8 lg:px-16 xl:px-24 flex items-center justify-start gap-8 mb-8">
          <h2 className="text-3xl font-semibold text-dracula-pink">В тренді</h2>
          {/* Прибираємо фон у контейнера табів і додаємо відступ між кнопками */}
          <TabsList className="bg-transparent p-0 space-x-8">
            <TabsTrigger value="movies" className={triggerStyles}>
              Фільми
            </TabsTrigger>
            <TabsTrigger value="tv" className={triggerStyles}>
              Серіали
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="movies">
          <MoviesCarousel movies={trendingMovies} />
        </TabsContent>
        <TabsContent value="tv">
          <TVShowsCarousel tvShows={trendingTVShows} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TrendingSection;

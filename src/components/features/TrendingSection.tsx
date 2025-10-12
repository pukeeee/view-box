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
    "text-lg hover:text-gray-300 rounded-none bg-transparent p-0 shadow-none data-[state=active]:text-dracula-pink data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-pink";

  return (
    <section id="trending" className="p-8 pt-12">
      <Tabs defaultValue="movies" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-dracula-pink">В тренді</h2>
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

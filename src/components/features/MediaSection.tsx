"use client";

import {
  useMediaStore,
  MediaType,
  MovieCategory,
  TVShowCategory,
} from "@/store/media-store";
import { useMediaData } from "@/hooks/use-media-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieCard from "../ui/MovieCard";
import TVShowCard from "../ui/TVShowCard";
import { Movie, TVShow } from "@/types/schemas";
import { Button } from "@/components/ui/button";

const movieCategories: MovieCategory[] = [
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];
const tvCategories: TVShowCategory[] = [
  "airing_today",
  "on_the_air",
  "popular",
  "top_rated",
];

const MediaSection = () => {
  const {
    mediaType,
    movieCategory,
    tvCategory,
    setMediaType,
    setMovieCategory,
    setTVCategory,
  } = useMediaStore();

  const { pages, isLoading, isError, loadMore, isLoadingMore, isReachingEnd } =
    useMediaData();

  const allMedia = pages ? pages.flat() : [];
  const uniqueMedia = Array.from(
    new Map(allMedia.map((item) => [item.id, item])).values(),
  );

  const isMovie = mediaType === "movie";
  const categories = isMovie ? movieCategories : tvCategories;
  const currentCategory = isMovie ? movieCategory : tvCategory;

  const triggerStyles =
    "text-lg hover:text-gray-300 rounded-none bg-transparent p-0 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple capitalize";

  return (
    <section
      id="media-section"
      data-scroll-section
      className="pb-8 pt-12 px-8 lg:px-16 xl:px-24"
    >
      {/* --- Таби 1-го рівня: Фільми / Серіали --- */}
      <div className="flex items-center justify-start gap-8 mb-8">
        <h2 className="text-3xl font-semibold text-dracula-pink">Огляд</h2>
        <Tabs
          value={mediaType}
          onValueChange={(value) => setMediaType(value as MediaType)}
        >
          <TabsList className="bg-transparent p-0 space-x-8">
            <TabsTrigger value="movie" className={triggerStyles}>
              Фільми
            </TabsTrigger>
            <TabsTrigger value="tv" className={triggerStyles}>
              Серіали
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* --- Таби 2-го рівня: Категорії --- */}
      <Tabs
        value={currentCategory}
        onValueChange={(value) => {
          if (isMovie) {
            setMovieCategory(value as MovieCategory);
          } else {
            setTVCategory(value as TVShowCategory);
          }
        }}
      >
        <TabsList className="w-full justify-start relative bg-transparent p-0 space-x-8 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-4">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={triggerStyles}
            >
              {category.replace(/_/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* --- Відображення контенту --- */}
      <div className="mt-8 min-h-[300px]">
        {isLoading && <p className="text-center">Завантаження...</p>}
        {isError && (
          <p className="text-center text-dracula-red">
            Помилка завантаження даних.
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {uniqueMedia.map((item) =>
            isMovie ? (
              <MovieCard key={item.id} movie={item as Movie} />
            ) : (
              <TVShowCard key={item.id} tvShow={item as TVShow} />
            ),
          )}
        </div>
      </div>

      {/* --- Кнопка "Завантажити ще" --- */}
      <div className="mt-12 flex justify-center">
        {!isReachingEnd && !isLoading && (
          <Button
            size="lg"
            variant="outline"
            className="select-none focus:outline-none"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Завантаження..." : "Завантажити ще"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default MediaSection;

// src/app/movie/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  TMDB_IMAGE_BASE_URL_ORIGINAL,
  TMDB_IMAGE_BASE_URL_W500,
} from "@/config/constants";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieRecommendations,
} from "@/services/tmdb-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieCard from "@/components/ui/MovieCard";
import BackButton from "@/components/ui/BackButton";
import { Movie } from "@/types/schemas";
import { Star } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  const [details, credits, videos, recommendations] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCredits(movieId),
    getMovieVideos(movieId),
    getMovieRecommendations(movieId),
  ]);

  if (!details) {
    notFound();
  }

  const backdropUrl = details.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL_ORIGINAL}${details.backdrop_path}`
    : null;

  const posterUrl = details.poster_path
    ? `${TMDB_IMAGE_BASE_URL_W500}${details.poster_path}`
    : null;

  const releaseYear = details.release_date?.substring(0, 4);
  const hours = Math.floor((details.runtime || 0) / 60);
  const minutes = (details.runtime || 0) % 60;
  const runtime = details.runtime ? `${hours}г ${minutes}хв` : "Невідомо";

  const trailer = videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const director = credits?.crew.find((c) => c.job === "Director");
  const mainCast = credits?.cast.slice(0, 10) || [];

  const formatMoney = (amount: number) => {
    if (amount === 0) return "Невідомо";
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen">
      {/* Кнопка назад */}
      <div className="fixed top-20 right-4 md:right-8 z-50">
        <BackButton />
      </div>

      {/* Hero секція з фоном */}
      <div className="relative h-[60vh] lg:h-[70vh]">
        {backdropUrl && (
          <>
            <Image
              src={backdropUrl}
              alt={details.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dracula-background via-dracula-background/60 to-transparent" />
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Постер для мобільних */}
            {posterUrl && (
              <div className="md:hidden relative w-32 h-48 mx-auto rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
                <Image
                  src={posterUrl}
                  alt={details.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Постер для десктопу */}
            {posterUrl && (
              <div className="hidden md:block relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
                <Image
                  src={posterUrl}
                  alt={details.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2">
                {details.title}
              </h1>
              {details.tagline && (
                <p className="text-base md:text-xl text-dracula-cyan italic mb-4">
                  {details.tagline}
                </p>
              )}
              <div className="flex flex-wrap gap-3 md:gap-4 text-white text-sm md:text-lg">
                <span>{releaseYear}</span>
                <span>•</span>
                <span>{runtime}</span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{details.vote_average.toFixed(1)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Основний контент */}
      <div className="px-8 lg:px-16 xl:px-24 py-12 space-y-12">
        {/* Опис та жанри */}
        <section>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-dracula-pink mb-4">
                  Огляд
                </h2>
                <p className="text-lg leading-relaxed text-dracula-foreground">
                  {details.overview || "Опис недоступний"}
                </p>
              </div>

              {director && (
                <div>
                  <h3 className="text-xl font-semibold text-dracula-purple mb-2">
                    Режисер
                  </h3>
                  <p className="text-lg text-dracula-foreground">
                    {director.name}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-3">
                  Жанри
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-dracula-current-line text-dracula-foreground rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-3">
                  Статус
                </h3>
                <p className="text-dracula-foreground">{details.status}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-3">
                  Бюджет
                </h3>
                <p className="text-dracula-foreground">
                  {formatMoney(details.budget)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-3">
                  Збори
                </h3>
                <p className="text-dracula-foreground">
                  {formatMoney(details.revenue)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Трейлер та актори */}
        <Tabs defaultValue="cast" className="w-full">
          <div className="overflow-x-auto -mx-8 px-8 lg:mx-0 lg:px-0">
            <TabsList className="w-full min-w-max lg:min-w-0 justify-start bg-transparent p-0 space-x-8 border-b border-dracula-current-line mb-6">
              <TabsTrigger
                value="cast"
                className="text-base md:text-lg hover:text-gray-300 rounded-none bg-transparent p-0 pb-2 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple whitespace-nowrap"
              >
                Актори
              </TabsTrigger>
              {trailer && (
                <TabsTrigger
                  value="trailer"
                  className="text-base md:text-lg hover:text-gray-300 rounded-none bg-transparent p-0 pb-2 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple whitespace-nowrap"
                >
                  Трейлер
                </TabsTrigger>
              )}
              <TabsTrigger
                value="info"
                className="text-base md:text-lg hover:text-gray-300 rounded-none bg-transparent p-0 pb-2 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple whitespace-nowrap"
              >
                Деталі
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cast" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {mainCast.map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-dracula-current-line">
                    {actor.profile_path ? (
                      <Image
                        src={`${TMDB_IMAGE_BASE_URL_W500}${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-dracula-comment">
                        👤
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-dracula-foreground">
                    {actor.name}
                  </h4>
                  <p className="text-sm text-dracula-comment">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          {trailer && (
            <TabsContent value="trailer" className="mt-6">
              <div className="relative mx-auto max-w-4xl w-full pt-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>
            </TabsContent>
          )}

          <TabsContent value="info" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-4">
                  Виробництво
                </h3>
                <div className="space-y-3">
                  {details.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center gap-3">
                      {company.logo_path && (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={`${TMDB_IMAGE_BASE_URL_W500}${company.logo_path}`}
                            alt={company.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-dracula-foreground">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-4">
                  Додаткова інформація
                </h3>
                <div className="space-y-3 text-dracula-foreground">
                  <div>
                    <span className="text-dracula-comment">
                      Оригінальна назва:
                    </span>
                    <p className="font-medium">{details.original_title}</p>
                  </div>
                  <div>
                    <span className="text-dracula-comment">Країни:</span>
                    <p className="font-medium">
                      {details.production_countries
                        .map((c) => c.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-dracula-comment">Мови:</span>
                    <p className="font-medium">
                      {details.spoken_languages.map((l) => l.name).join(", ")}
                    </p>
                  </div>
                  {details.imdb_id && (
                    <div>
                      <span className="text-dracula-comment">IMDB:</span>
                      <a
                        href={`https://www.imdb.com/title/${details.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-dracula-cyan hover:text-dracula-pink ml-2"
                      >
                        Переглянути
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Рекомендації */}
        {recommendations && recommendations.results.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-dracula-pink mb-6">
              Схожі фільми
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommendations.results.slice(0, 12).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={
                    {
                      ...movie,
                      title: movie.title || movie.name || "",
                      release_date: movie.release_date,
                      backdrop_path: null,
                    } as Movie
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

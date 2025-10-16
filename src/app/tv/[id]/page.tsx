// src/app/tv/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  TMDB_IMAGE_BASE_URL_ORIGINAL,
  TMDB_IMAGE_BASE_URL_W500,
} from "@/config/constants";
import {
  getTVDetails,
  getTVCredits,
  getTVVideos,
  getTVRecommendations,
} from "@/services/tmdb-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TVShowCard from "@/components/ui/TVShowCard";
import BackButton from "@/components/ui/BackButton";
import { TVShow } from "@/types/schemas";
import { Star } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TVDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tvId = parseInt(id, 10);

  if (isNaN(tvId)) {
    notFound();
  }

  const [details, credits, videos, recommendations] = await Promise.all([
    getTVDetails(tvId),
    getTVCredits(tvId),
    getTVVideos(tvId),
    getTVRecommendations(tvId),
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

  const firstAirYear = details.first_air_date?.substring(0, 4);
  const lastAirYear = details.last_air_date?.substring(0, 4);
  const yearsRange =
    lastAirYear && lastAirYear !== firstAirYear
      ? `${firstAirYear} - ${lastAirYear}`
      : firstAirYear;

  const avgRuntime =
    details.episode_run_time.length > 0
      ? `~${details.episode_run_time[0]}хв`
      : null;

  const trailer = videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const creators = details.created_by || [];
  const mainCast = credits?.cast.slice(0, 10) || [];

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
              alt={details.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dracula-background via-dracula-background/60 to-transparent" />
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {posterUrl && (
              <div className="hidden md:block relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
                <Image
                  src={posterUrl}
                  alt={details.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">
                {details.name}
              </h1>
              {details.tagline && (
                <p className="text-xl text-dracula-cyan italic mb-4">
                  {details.tagline}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-white text-lg">
                <span>{yearsRange}</span>
                <span>•</span>
                <span>
                  {details.number_of_seasons}{" "}
                  {details.number_of_seasons === 1 ? "сезон" : "сезони"}
                </span>
                {avgRuntime && (
                  <>
                    <span>•</span>
                    <span>{avgRuntime}</span>
                  </>
                )}
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

              {creators.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-dracula-purple mb-2">
                    Створювачі
                  </h3>
                  <p className="text-lg text-dracula-foreground">
                    {creators.map((c) => c.name).join(", ")}
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
                  Сезонів
                </h3>
                <p className="text-dracula-foreground">
                  {details.number_of_seasons}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dracula-purple mb-3">
                  Епізодів
                </h3>
                <p className="text-dracula-foreground">
                  {details.number_of_episodes}
                </p>
              </div>

              {details.networks.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-dracula-purple mb-3">
                    Мережі
                  </h3>
                  <div className="space-y-2">
                    {details.networks.slice(0, 3).map((network) => (
                      <div key={network.id} className="flex items-center gap-2">
                        {network.logo_path && (
                          <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                              src={`${TMDB_IMAGE_BASE_URL_W500}${network.logo_path}`}
                              alt={network.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="text-sm text-dracula-foreground">
                          {network.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Трейлер та актори */}
        <Tabs defaultValue="cast" className="w-full">
          <TabsList className="w-full justify-start bg-transparent p-0 space-x-8 border-b border-dracula-current-line mb-6">
            <TabsTrigger
              value="cast"
              className="text-lg hover:text-gray-300 rounded-none bg-transparent p-0 pb-2 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple"
            >
              Актори
            </TabsTrigger>
            {trailer && (
              <TabsTrigger
                value="trailer"
                className="text-lg hover:text-gray-300 rounded-none bg-transparent p-0 pb-2 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple"
              >
                Трейлер
              </TabsTrigger>
            )}
            <TabsTrigger
              value="info"
              className="text-lg hover:text-gray-300 rounded-none bg-transparent p-0 pb-2 shadow-none data-[state=active]:text-dracula-purple data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dracula-purple"
            >
              Деталі
            </TabsTrigger>
          </TabsList>

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
                    <p className="font-medium">{details.original_name}</p>
                  </div>
                  <div>
                    <span className="text-dracula-comment">Перша серія:</span>
                    <p className="font-medium">
                      {new Date(details.first_air_date).toLocaleDateString(
                        "uk-UA",
                      )}
                    </p>
                  </div>
                  {details.last_air_date && (
                    <div>
                      <span className="text-dracula-comment">
                        Остання серія:
                      </span>
                      <p className="font-medium">
                        {new Date(details.last_air_date).toLocaleDateString(
                          "uk-UA",
                        )}
                      </p>
                    </div>
                  )}
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
                  {details.homepage && (
                    <div>
                      <span className="text-dracula-comment">Сайт:</span>
                      <a
                        href={details.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-dracula-cyan hover:text-dracula-pink ml-2"
                      >
                        Відвідати
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
              Схожі серіали
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommendations.results.slice(0, 12).map((show) => (
                <TVShowCard
                  key={show.id}
                  tvShow={
                    {
                      ...show,
                      name: show.name || show.title || "",
                      first_air_date: show.first_air_date,
                      backdrop_path: null,
                    } as TVShow
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

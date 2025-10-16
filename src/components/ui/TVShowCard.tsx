import { TVShow } from "@/types/schemas";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL_W500 } from "@/config/constants";

interface Props {
  tvShow: TVShow;
}

const FALLBACK_IMAGE = "/placeholder-movie.svg"; // Використовуємо нашу SVG-заглушку

const TVShowCard = ({ tvShow }: Props) => {
  const isFallback = !tvShow.poster_path;
  const imagePath = isFallback
    ? FALLBACK_IMAGE
    : `${TMDB_IMAGE_BASE_URL_W500}${tvShow.poster_path}`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full aspect-w-2 aspect-h-3">
        <Image
          src={imagePath}
          alt={tvShow.name}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyODJhMzYiLz48L3N2Zz4="
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          unoptimized={isFallback}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{tvShow.name}</h3>
        <p className="text-sm text-gray-400">
          {tvShow.first_air_date?.substring(0, 4) || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;
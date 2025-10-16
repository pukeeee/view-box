import { Movie } from "@/types/schemas";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL_W500 } from "@/config/constants";

interface Props {
  movie: Movie;
}

const FALLBACK_IMAGE = "/placeholder-movie.svg"; // Використовуємо нашу SVG-заглушку

const MovieCard = ({ movie }: Props) => {
  const imagePath = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL_W500}${movie.poster_path}`
    : FALLBACK_IMAGE;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full aspect-w-2 aspect-h-3">
        <Image
          src={imagePath}
          alt={movie.title}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyODJhMzYiLz48L3N2Zz4="
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.release_date?.substring(0, 4) || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
'use client';

import { TVShow } from "@/types/schemas";
import Image from "next/image";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL_W500 } from "@/config/constants";
import { Star } from "lucide-react";

interface Props {
  tvShow: TVShow;
}

const FALLBACK_IMAGE = "/placeholder-movie.svg";

const TVShowCard = ({ tvShow }: Props) => {
  const isFallback = !tvShow.poster_path;
  const imagePath = isFallback
    ? FALLBACK_IMAGE
    : `${TMDB_IMAGE_BASE_URL_W500}${tvShow.poster_path}`;

  return (
    <Link
      href={`/tv/${tvShow.id}`}
      className="block w-full h-full shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 group cursor-pointer"
    >
      <div className="flex flex-col h-full bg-dracula-background rounded-lg overflow-hidden">
        <div className="relative w-full aspect-w-2 aspect-h-3 flex-shrink-0">
          <Image
            src={imagePath}
            alt={tvShow.name}
            fill
            className="object-cover group-hover:brightness-75 transition-all duration-300"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyODJhMzYiLz48L3N2Zz4="
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            unoptimized={isFallback}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg truncate text-dracula-foreground group-hover:text-dracula-purple transition-colors">
            {tvShow.name}
          </h3>
          <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-dracula-comment">
                  {tvShow.first_air_date?.substring(0, 4) || "N/A"}
              </p>
              <div className="flex items-center gap-1 text-sm text-dracula-comment">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{tvShow.vote_average.toFixed(1)}</span>
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TVShowCard;
import { Movie } from "@/types/schemas";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL_W500 } from "@/config/constants";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const imagePath = `${TMDB_IMAGE_BASE_URL_W500}${movie.poster_path}`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full aspect-w-2 aspect-h-3">
        <Image
          src={imagePath}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.release_date?.substring(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

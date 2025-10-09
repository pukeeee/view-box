import { Movie } from "@/types";
import { TMDB_IMAGE_BASE_URL_ORIGINAL } from "@/config/constants";
import Image from "next/image";

interface Props {
  movie: Movie;
}

const HeroSlideCard = ({ movie }: Props) => {
  const imagePath = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL_ORIGINAL}${movie.backdrop_path}`
    : null;

  return (
    <div className="relative w-full h-[80vh] text-white">
      {/* Шар 1: Зображення через next/image */}
      {imagePath && (
        <Image
          src={imagePath}
          alt={movie.title}
          fill
          className="object-cover"
        />
      )}

      {/* Шар 2: Градієнт */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

      {/* Шар 3: Контент */}
      <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-16 max-w-2xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h2>
        <p className="text-lg mb-6 line-clamp-3">{movie.overview}</p>
        <div className="flex space-x-4">
          <button className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md font-bold transition">
            Watch
          </button>
          <button className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-md font-bold transition">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideCard;

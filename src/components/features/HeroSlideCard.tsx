import { Movie } from "@/types/schemas";
import { TMDB_IMAGE_BASE_URL_ORIGINAL } from "@/config/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  movie: Movie;
}

const HeroSlideCard = ({ movie }: Props) => {
  const imagePath = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL_ORIGINAL}${movie.backdrop_path}`
    : null;

  return (
    <div className="relative w-full h-[85vh] text-white">
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
          <Button size="lg" variant="outline">
            Watch
          </Button>
          <Button size="lg" variant="outline">
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideCard;

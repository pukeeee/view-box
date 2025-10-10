import { TVshow } from "@/types";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL_W500 } from "@/config/constants";

interface Props {
  tvShow: TVshow;
}

const TVShowsCard = ({ tvShow }: Props) => {
  const imagePath = `${TMDB_IMAGE_BASE_URL_W500}${tvShow.poster_path}`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-auto" style={{ paddingTop: "150%" }}>
        <Image
          src={imagePath}
          alt={tvShow.name}
          fill
          style={{ objectFit: "cover" }}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{tvShow.name}</h3>
        <p className="text-sm text-gray-400">
          {tvShow.first_air_date.substring(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default TVShowsCard;

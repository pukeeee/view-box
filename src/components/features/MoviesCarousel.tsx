"use client"; // 👈 Дуже важливо! Swiper - це клієнтський компонент.

import { Movie } from "@/types/schemas";
import MovieCard from "../ui/MovieCard";

// Імпортуємо компоненти Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  movies: Movie[];
}

const MoviesCarousel = ({ movies }: Props) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      // Кількість слайдів для показу
      slidesPerView={5.5}
      // Відстань між слайдами
      spaceBetween={20}
      // Налаштування для різних розмірів екрану (адаптивність)
      breakpoints={{
        320: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2.5,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5.5,
          spaceBetween: 20,
        },
      }}
      loop={true} // Безкінечна прокрутка
      autoplay={{
        delay: 5000,
        disableOnInteraction: false, // Не вимикати після ручного переключення
      }}
      speed={2000}
      className="media-carousel"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MoviesCarousel;

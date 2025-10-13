"use client"; // 👈 Дуже важливо! Swiper - це клієнтський компонент.

import { TVShow } from "@/types/schemas";
import TVShowCard from "../ui/TVShowCard";

// Імпортуємо компоненти Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  tvShows: TVShow[];
}

const TVShowsCarousel = ({ tvShows }: Props) => {
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
          slidesPerView: 2.2,
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
      {tvShows.map((tvShow) => (
        <SwiperSlide key={tvShow.id}>
          <TVShowCard tvShow={tvShow} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TVShowsCarousel;

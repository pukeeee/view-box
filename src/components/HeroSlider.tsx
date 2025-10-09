"use client";

import { Movie } from "@/types";
import HeroSlideCard from "./HeroSlideCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

interface Props {
  movies: Movie[];
}

const HeroSlider = ({ movies }: Props) => {
  return (
    // `group` клас потрібен, щоб стрілки з'являлись при наведенні на всю карусель
    <div className="relative group">
      <Swiper
        // Підключаємо модулі
        modules={[Autoplay, Navigation, EffectCreative]}
        // grabCursor={true}
        slidesPerView={1} // 1 слайд на всю ширину
        loop={true} // Безкінечна прокрутка
        autoplay={{
          delay: 10000, // 10 секунд
          disableOnInteraction: false, // Не вимикати після ручного переключення
        }}
        navigation={true} // Вмикаємо стрілки
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        speed={1000}
        className="w-full h-[80vh]" // Фіксований розмір
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <HeroSlideCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Стилізація стрілок, щоб вони з'являлись при наведенні */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          opacity: 0;
          transition: opacity 0.3s;
          color: white; /* Колір стрілок */
        }
        .group:hover .swiper-button-prev,
        .group:hover .swiper-button-next {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;

"use client";

import { Movie } from "@/types/schemas";
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
        className="w-full h-[85vh] hero-swiper" // Фіксований розмір
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <HeroSlideCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

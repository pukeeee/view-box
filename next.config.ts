import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ваш існуючий "білий список" для домену TMDb
    remotePatterns: [{ protocol: "https", hostname: "image.tmdb.org" }],

    // 1. Кешувати зображення на 31 день
    minimumCacheTTL: 2678400,

    // 2. Генерувати зображення тільки у форматі WebP
    formats: ['image/webp'],

    // 3. Оптимізовані розміри для повнорозмірних зображень (напр. для HeroSlider)
    deviceSizes: [640, 828, 1200, 1920],

    // 4. Оптимізовані розміри для карток фільмів (значно скорочує кількість трансформацій)
    // Розширений набір розмірів для кращої відповідності мобільним пристроям з високою щільністю пікселів.
    imageSizes: [96, 128, 256, 384, 512, 640],
  },
};

export default nextConfig;
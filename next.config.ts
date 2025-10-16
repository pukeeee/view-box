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
    imageSizes: [180, 240, 384],
  },
};

export default nextConfig;
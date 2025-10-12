"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useMediaStore, MediaType } from "@/store/media-store";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const setMediaType = useMediaStore((state) => state.setMediaType); // Дістаємо action зі стору

  // Нова функція для навігації
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    mediaType?: MediaType,
  ) => {
    e.preventDefault();

    // 1. Якщо передано тип медіа, оновлюємо стан
    if (mediaType) {
      setMediaType(mediaType);
    }

    // 2. Плавно прокручуємо до секції
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent text-white p-8 pl-10 flex items-center justify-between z-50">
      <div className="flex items-center space-x-16">
        <Link href="/" className="text-3xl font-bold text-dracula-pink">
          ViewBox
        </Link>
      </div>
      <div className="flex items-center space-x-24">
        <nav className="space-x-12">
          <Link
            href="#"
            onClick={(e) => handleNavClick(e, "body")}
            className="text-lg hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="#media-section"
            onClick={(e) => handleNavClick(e, "#media-section", "movie")}
            className="text-lg hover:text-gray-300"
          >
            Movies
          </Link>
          <Link
            href="#media-section"
            onClick={(e) => handleNavClick(e, "#media-section", "tv")}
            className="text-lg hover:text-gray-300"
          >
            Series
          </Link>
        </nav>
        <div className="flex items-center">
          {isSearchVisible ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b-2 border-white focus:outline-none"
              />
              <button
                onClick={() => setIsSearchVisible(false)}
                className="ml-2"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSearchVisible(true)}>
              <Search className="h-8 w-8" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

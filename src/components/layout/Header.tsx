"use client";

import Link from "next/link";
import { Search, X, Menu } from "lucide-react";
import { useState } from "react";
import { useMediaStore, MediaType } from "@/store/media-store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Стан для керування Sheet
  const setMediaType = useMediaStore((state) => state.setMediaType);

  const handleNavClick = (id: string, mediaType?: MediaType) => {
    setIsSheetOpen(false); // Спочатку закриваємо Sheet

    // Із затримкою, щоб дати меню закритись, виконуємо скрол
    setTimeout(() => {
      if (mediaType) {
        setMediaType(mediaType);
      }
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 300);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent text-white p-4 md:p-8 md:pl-10 flex items-center justify-between z-50">
      <div className="flex items-center space-x-8 md:space-x-16">
        <Link href="/" className="text-4xl font-bold text-dracula-pink">
          ViewBox
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-24">
        <nav className="space-x-12">
          {/* Для десктопу використовуємо preventDefault, бо тут немає Sheet */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("body");
            }}
            className="text-xl hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="#media-section"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#media-section", "movie");
            }}
            className="text-xl hover:text-gray-300"
          >
            Movies
          </Link>
          <Link
            href="#media-section"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#media-section", "tv");
            }}
            className="text-xl hover:text-gray-300"
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

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center space-x-4">
        <div className="flex items-center">
          {isSearchVisible ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b-2 border-white focus:outline-none w-36"
              />
              <button
                onClick={() => setIsSearchVisible(false)}
                className="ml-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSearchVisible(true)}>
              <Search className="h-6 w-6" />
            </button>
          )}
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="select-none focus:outline-none">
              <Menu className="h-8 w-8" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="bg-background/90 text-white border-b-dracula-pink select-none"
          >
            <nav className="flex flex-col items-center space-y-6 pt-8">
              <button
                onClick={() => handleNavClick("body")}
                className="text-lg hover:text-gray-300 focus:outline-none"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("#media-section", "movie")}
                className="text-lg hover:text-gray-300 focus:outline-none"
              >
                Movies
              </button>
              <button
                onClick={() => handleNavClick("#media-section", "tv")}
                className="text-lg hover:text-gray-300 focus:outline-none"
              >
                Series
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

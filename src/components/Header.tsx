"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent text-white p-8 pl-10 flex items-center justify-between z-50">
      <div className="flex items-center space-x-14">
        <Link
          href="/"
          className="text-3xl font-bold"
          style={{ color: "var(--dracula-pink)" }}
        >
          ViewBox
        </Link>
      </div>
      <div className="flex items-center space-x-28">
        <nav className="space-x-24">
          <Link href="/" className="text-lg hover:text-gray-300">
            Home
          </Link>
          <Link href="/movies" className="text-lg hover:text-gray-300">
            Movies
          </Link>
          <Link href="/series" className="text-lg hover:text-gray-300">
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

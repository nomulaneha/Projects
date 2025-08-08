import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                HeartGuard
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Patient Dashboard
              </Link>
              <Link
                to="/organization-dashboard"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Organization Dashboard
              </Link>
              <Link
                to="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                FAQ
              </Link>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-6 p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 sm:hidden">
            {/* Dark mode toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Patient Dashboard
          </Link>
          <Link
            to="/organization-dashboard"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Organization Dashboard
          </Link>
          <Link
            to="/about"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/faq"
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};

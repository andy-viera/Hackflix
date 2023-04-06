import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-gray-900/60 transition duration-300 ease-in-out backdrop-filter backdrop-blur-md"
          : "bg-transparent transition duration-200 ease-in-out pt-2"
      }`}
    >
      <div className="px-2 mx-5 sm:mx-12 md:mx-14 lg:mx-16 ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={"/"}>
              <div className="text-2xl font-extrabold text-purple-700">
                HackFlix
              </div>
            </Link>
          </div>
          <div className="flex items-center relative">
            <button
              id="dropdownHoverButton"
              onMouseEnter={handleMouseEnter}
              className="relative flex items-center text-white text-sm font-medium bg-transparent outline outline-2 outline-purple-700 px-4 py-1.5 rounded-full mb-0 hover:bg-purple-700 transition delay-150 ease-in-out"
              type="button"
            >
              Search by{" "}
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {dropdownVisible && (
              <div
                className="absolute top-10 z-10 rounded-lg shadow bg-gray-700/25 backdrop-filter backdrop-blur-md w-40"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link to={"/movies/search-by-title"}>
                      <div className="block px-3 py-3 hover:bg-gray-700/30">
                        Search by title
                        <span className="ml-2">
                          <SearchIcon className="icon-small" />
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/movies/search-by-rating"}>
                      <div className="block px-3 py-3 hover:bg-gray-700/30">
                        Search by rating
                        <span className="ml-2">
                          <StarBorderIcon className="icon-small" />
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

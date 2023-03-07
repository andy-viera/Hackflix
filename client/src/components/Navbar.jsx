import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-gray-900/60 transition duration-300 ease-in-out backdrop-filter backdrop-blur-md"
          : "bg-transparent transition duration-200 ease-in-out pt-2"
      }`}
    >
      <div className="px-2 mx-16">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={"/"}>
              <div className="text-2xl font-extrabold text-purple-700">
                HackFlix
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to={"/movies/search-by-title"}>
              <div className="block text-white text-sm bg-transparent outline outline-2 outline-purple-700 px-4 py-1.5 rounded-full mb-0 hover:bg-purple-700 transition delay-150 ease-in-out">
                Search by title
                <span className="ml-2">
                  <SearchIcon className="icon-small" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchByTitle() {
  const [movieTitleInput, setMovieTitleInput] = useState("");
  const [latestMovieData, setLatestMovieData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieTitleInput}&page=${nextPage}`
    );
    setFilteredMovies([...filteredMovies, ...response.data.results]);
    setPage(nextPage);
  };

  useEffect(() => {
    const getLatestMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&sort_by=release_date.desc`
      );
      setLatestMovieData(response.data.results);
    };
    getLatestMovies();
  }, []);

  useEffect(() => {
    const getFilteredMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieTitleInput}`
      );
      setFilteredMovies(response.data.results);
    };
    getFilteredMovies();
    setPage(1);
  }, [movieTitleInput]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        loadMore();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, filteredMovies]);

  return (
    <>
      <Navbar />
      <div className="w-4/3 mt-48 mx-auto">
        <div className="flex justify-center">
          <TextField
            variant="standard"
            className="w-2/3 placeholder:text-base outline outline-2 outline-purple-700 focus:outline-none text-white text-sm bg-gray-800/25 px-4 py-3 rounded-full mb-0"
            value={movieTitleInput}
            onChange={(event) => setMovieTitleInput(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ fontSize: 24, color: "white", marginLeft: "0.8rem" }}
                  />
                </InputAdornment>
              ),
              placeholder: "Enter movie title...",
              disableUnderline: true,
              style: {
                color: "white",
                height: "48px", // Set the height to the desired value
              },
            }}
          />
        </div>

        <div className="w-3/4 mx-auto">
          {filteredMovies.length > 0 && movieTitleInput !== "" ? (
            <>
              <div className="grid grid-cols-4 gap-4 mt-16">
                {filteredMovies.map((movie) =>
                  movie.poster_path ? (
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded mx-auto hover:scale-105 transition duration-700 ease-in-out"
                      />
                    </Link>
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="spinner"></div>
                    </div>
                  )
                )}
              </div>

              <div ref={loaderRef}></div>
            </>
          ) : movieTitleInput === "" ? (
            <div className="w-1/2 mt-16 rounded bg-purple-700/90 py-3.5 mx-auto text-white text-center font-bold">
              Start typing to search for a specific title!
            </div>
          ) : (
            <div className="w-1/2 mt-16 rounded bg-purple-700/90 py-3.5 mx-auto text-white text-center font-bold">
              No movies matched the specified criteria
            </div>
          )}
        </div>
      </div>
      {filteredMovies.length === 0 ? (
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </>
  );
}

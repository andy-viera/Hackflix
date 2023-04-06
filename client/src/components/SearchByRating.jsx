import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SearchByRating() {
  const [rankingMovieData, setRankingMovieData] = useState([]);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);

  async function handleRating(rating) {
    setRating(rating);
    setPage(1);
  }

  useEffect(() => {
    const getRankingMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&sort_by=popularity.desc&include_adult=false&page=${page}&vote_average.gte=${
          rating * 2 - 2
        }`
      );
      setRankingMovieData([...rankingMovieData, ...response.data.results]);
    };
    getRankingMovies();
  }, [page]);

  useEffect(() => {
    const getRankingMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&sort_by=popularity.desc&include_adult=false&page=${page}&vote_average.gte=${
          rating * 2 - 2
        }`
      );
      setRankingMovieData(response.data.results);
    };
    getRankingMovies();
  }, [rating]);

  const handleNextPage = () => {
    console.log("final");
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <div className="flex justify-center items-center mt-48">
          <Rating onClick={handleRating} size={60} fillColor="#c084fc" />
        </div>
        {rankingMovieData.length > 0 && (
          <InfiniteScroll
            dataLength={rankingMovieData.length}
            next={handleNextPage}
            hasMore={true}
            loader={<div className="spinner"></div>}
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">
              {rankingMovieData.map((movie) =>
                movie.poster_path ? (
                  <Link to={`/movie/${movie.id}`}>
                    <div
                      key={movie.id}
                      className=" hover:scale-105 transition duration-700 ease-in-out"
                    >
                      {" "}
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="flex justify-center items-center">
                    <div className="spinner"></div>
                  </div>
                )
              )}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <Footer />
    </>
  );
}

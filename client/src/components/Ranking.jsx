import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Movie from "./Movie";

export default function Ranking({ rankingMovieData, setRankingMovieData }) {
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${nextPage}`
    );
    setRankingMovieData([...rankingMovieData, ...response.data.results]);
    setPage(nextPage);
  };

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
  }, [loaderRef, rankingMovieData]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {rankingMovieData && (
        <>
          {rankingMovieData.map((movie) => {
            return <Movie movieData={movie} key={movie.id} />;
          })}
        </>
      )}
      <div ref={loaderRef}></div>
    </div>
  );
}

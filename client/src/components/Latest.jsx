import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Movie from "./Movie";

export default function Latest({ latestMovieData, setLatestMovieData }) {
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&sort_by=release_date.desc&page=${nextPage}`
    );
    setLatestMovieData([...latestMovieData, ...response.data.results]);
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
  }, [loaderRef, latestMovieData]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {latestMovieData && (
        <>
          {latestMovieData.map((movie) => {
            return <Movie movieData={movie} key={movie.id} />;
          })}
        </>
      )}
      <div ref={loaderRef}></div>
    </div>
  );
}

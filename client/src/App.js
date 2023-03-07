import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import SearchByTitle from "./components/SearchByTitle";

function App() {
  const [heroMovieData, setHeroMovieData] = useState([]);
  const [latestMovieData, setLatestMovieData] = useState([]);
  const [rankingMovieData, setRankingMovieData] = useState([]);

  useEffect(() => {
    const getHeroMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&sort_by=release_date.desc&page=1`
      );
      setHeroMovieData(response.data.results);
    };
    getHeroMovies();
  }, []);

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
    const getRankingMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setRankingMovieData(response.data.results);
    };
    getRankingMovies();
  }, []);

  return (
    <div className="App bg-gray-900 ">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              heroMovieData={heroMovieData}
              setHeroMovieData={setHeroMovieData}
              latestMovieData={latestMovieData}
              setLatestMovieData={setLatestMovieData}
              rankingMovieData={rankingMovieData}
              setRankingMovieData={setRankingMovieData}
            />
          }
        ></Route>
        <Route path="/movies/:movieid" element={<MovieDetails />}></Route>
        <Route
          path="/movies/search-by-title"
          element={
            <SearchByTitle
              latestMovieData={latestMovieData}
              setLatestMovieData={setLatestMovieData}
            />
          }
        ></Route>
        {/* <Route path="*" element={<Eror404/>}>
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;

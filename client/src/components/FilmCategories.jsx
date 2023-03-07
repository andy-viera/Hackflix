import React, { useState } from "react";
import Latest from "./Latest";
import Ranking from "./Ranking";

export default function FilmCategories({
  latestMovieData,
  setLatestMovieData,
  rankingMovieData,
  setRankingMovieData,
}) {
  const [directoryState, setDirectoryState] = useState("");

  const handleLatestClick = () => {
    setDirectoryState("latest");
  };

  const handleRankingClick = () => {
    setDirectoryState("ranking");
  };

  return (
    <div className="w-4/5 mx-auto mt-6">
      <div className="flex items-baseline mb-10">
        <h2 className="text-white text-3xl font-semibold mr-16">
          Movie Directory
        </h2>

        <h4
          onClick={handleLatestClick}
          className="text-white text-lg font-light mr-8 rounded-full bg-purple-800/70 hover:bg-purple-700/30 hover:scale-105 transition duration-300 ease-in-out px-3.5 py-1 cursor-pointer"
        >
          Latest
        </h4>
        <h4
          onClick={handleRankingClick}
          className="text-white text-lg font-light rounded-full bg-purple-800/70 hover:bg-purple-700/30 hover:scale-105 transition duration-300 ease-in-out px-3.5 py-1 cursor-pointer"
        >
          Ranking
        </h4>
      </div>
      {directoryState === "latest" ? (
        <Latest
          latestMovieData={latestMovieData}
          setLatestMovieData={setLatestMovieData}
        />
      ) : directoryState === "ranking" ? (
        <Ranking
          rankingMovieData={rankingMovieData}
          setRankingMovieData={setRankingMovieData}
        />
      ) : (
        <Latest
          latestMovieData={latestMovieData}
          setLatestMovieData={setLatestMovieData}
        />
      )}
    </div>
  );
}

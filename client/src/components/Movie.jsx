import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Movie({ movieData }) {
  const [showModal, setShowModal] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      const movieGenres = data.genres.filter((genre) =>
        movieData.genre_ids.includes(genre.id)
      );
      setGenres(movieGenres);
    }

    fetchGenres();
  }, [movieData.genre_ids]);

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <>
        <Link to={`/movies/${movieData.id}`}>
          {movieData.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
              alt={movieData.title}
              className="rounded"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ) : (
            <div className="flex justify-center items-center">
              <div className="spinner"></div>
            </div>
          )}
          {showModal && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-2/4 w-full h-3/4 rounded-lg overflow-hidden z-10"
              style={{
                backgroundColor: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(10px)",
                overflowY: "auto",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="h-full flex flex-col justify-between p-5 text-white">
                <div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {movieData.title}
                    </h3>
                    <div className="mb-3 flex items-baseline">
                      <div className="text-purple-700 mr-4">
                        <span className="text-lg">
                          {movieData.vote_average}
                        </span>
                        <span className="text-base">/10</span>
                      </div>
                      <div className="text-base">
                        {movieData.release_date.slice(0, 4)}
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm overflow-hidden text-gray-300"
                    style={{
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {movieData.overview}
                  </p>
                  <div className="mt-3">
                    <p className="text-sm text-gray-300">
                      Genres:{" "}
                      {genres.map((genre, index) => (
                        <span className="text-sm" key={genre.id}>
                          {genre.name}
                          {index < genres.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Link>
      </>
    </div>
  );
}

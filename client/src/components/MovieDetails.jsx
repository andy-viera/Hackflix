import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MovieDetails() {
  const params = useParams();

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.movieid}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setMovieDetails(response.data);
    };
    getMovieDetails();
  }, []);

  function formatNumberWithDots(num) {
    const numString = String(num);
    const numLength = numString.length;

    let formatted = "";
    let dotCount = 0;

    for (let i = numLength - 1; i >= 0; i--) {
      formatted = numString.charAt(i) + formatted;
      dotCount++;
      if (dotCount === 3 && i !== 0) {
        formatted = "." + formatted;
        dotCount = 0;
      }
    }

    return formatted;
  }

  return (
    <>
      <Navbar />
      {movieDetails && (
        <div className="w-11/12 sm:w-4/5 mt-28 mx-auto">
          <div className="grid gap-4 grid-cols-5 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1">
              {movieDetails.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="rounded w-full sm:w-3/4 mx-auto"
                />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            <div className="col-span-3 sm:col-span-2">
              <div className="col-span-3 sm:col-span-0">
                <h2 className="text-2xl sm:text-4xl text-white font-bold mb-10">
                  {movieDetails.title}
                </h2>
                <div className="flex items-center">
                  <div className="text-purple-700 text-base sm:text-xl bg-gray-800 rounded-full py-1.5 px-3 mr-5">
                    {(
                      Math.round(movieDetails.vote_average * 10 * 10) / 100
                    ).toFixed(2)}
                    <span className="text-base sm:text-lg mr-2">/10</span>
                    <span className="text-gray-500 text-smaller">
                      {`(${movieDetails.vote_count} votos)`}
                    </span>
                  </div>
                  <div className="text-purple-700 text-base sm:text-xl bg-gray-800 rounded-full py-1 px-3 ">
                    {movieDetails.release_date &&
                      movieDetails.release_date.slice(0, 4)}
                  </div>
                </div>
              </div>
              <div className="col-span-3 sm:col-span-0">
                <div className="mt-12 text-gray-500 text-base sm:text-lg">
                  {movieDetails.overview}
                </div>
                <div className="grid gap-1 grid-cols-2">
                  <div className="mt-12">
                    <div className="text-gray-500">
                      {movieDetails.genres ? (
                        <>
                          <span className="font-semibold">Genres:</span>{" "}
                          {movieDetails.genres.map((genre, index) => (
                            <span key={genre.id}>
                              {genre.name}
                              {index < movieDetails.genres.length - 1 && ", "}
                            </span>
                          ))}
                        </>
                      ) : (
                        <div className="spinner"></div>
                      )}
                    </div>
                    <div className="mt-3 text-gray-500">
                      <span className="font-semibold">Budget:</span>{" "}
                      {movieDetails.budget === 0
                        ? "Unknown"
                        : `${formatNumberWithDots(movieDetails.budget)} USD`}
                    </div>
                    <div className="mt-3 text-gray-500">
                      <span className="font-semibold">Revenue:</span>{" "}
                      {movieDetails.revenue === 0
                        ? "Unknown"
                        : `${formatNumberWithDots(movieDetails.revenue)} USD`}
                    </div>
                  </div>
                  <div className="mt-12">
                    <div className="text-gray-500">
                      <span className="font-semibold">Produced by:</span>
                      {movieDetails.production_companies ? (
                        movieDetails.production_companies.map(
                          (company, index) => (
                            <span key={company.id}>
                              {" "}
                              {company.name}
                              {index <
                                movieDetails.production_companies.length - 1 &&
                                ", "}
                            </span>
                          )
                        )
                      ) : (
                        <div className="spinner"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-10 sm:absolute sm:bottom-0 w-full sm:mt-0">
        <Footer />
      </div>
    </>
  );
}

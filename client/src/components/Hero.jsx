import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

export default function Hero({ heroMovieData, setHeroMovieData }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "1",
        }}
      >
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  };

  const latestMovies = heroMovieData.slice(0, 4);

  return (
    <div className="bg-gray-900">
      <Slider {...settings}>
        {latestMovies.map((movie) => (
          <div key={movie.id}>
            <div
              className="bg-cover bg-no-repeat mb-10 relative"
              style={{
                backgroundImage: `linear-gradient(to top, #111827, transparent), url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                backgroundPositionY: "24%",
                height: "68vh",
              }}
            >
              <div className="absolute inset-0 w-4/5 mx-auto top-1/4">
                {" "}
                <h1 className="font-bold text-6xl text-white mb-5">
                  {movie.title}
                </h1>
                <p className="text-lg text-gray-300 mb-10">{movie.overview}</p>
                <a
                  href="#"
                  className="rounded-full bg-gradient-to-r from-purple-700 hover:bg-purple-700 hover:scale-105 transition duration-300 ease-in-out text-white px-3 py-1.5 w-fit flex"
                >
                  <Link to={`movies/${movie.id}`}>
                    <div className="flex align-baseline">
                      <span className="mr-2 text-xl ">More Info </span>{" "}
                      <span>
                        {" "}
                        <InfoOutlinedIcon />
                      </span>
                    </div>
                  </Link>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

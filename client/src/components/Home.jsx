import Navbar from "./Navbar";
import Hero from "./Hero";
import FilmCategories from "./FilmCategories";
import Footer from "./Footer";

export default function Home({
  heroMovieData,
  setHeroMovieData,
  latestMovieData,
  setLatestMovieData,
  rankingMovieData,
  setRankingMovieData,
}) {
  return (
    <>
      <Navbar />
      <Hero heroMovieData={heroMovieData} setHeroMovieData={setHeroMovieData} />
      <FilmCategories
        latestMovieData={latestMovieData}
        setLatestMovieData={setLatestMovieData}
        rankingMovieData={rankingMovieData}
        setRankingMovieData={setRankingMovieData}
      />
      <Footer />
    </>
  );
}

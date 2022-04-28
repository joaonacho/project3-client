import React from "react";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  // randomFive,
  getUpcomingMovies,
  getInTheatres,
  getPopularMovies,
  getTopRated,
  trendingWeekMovies,
} from "../api";
import { Link } from "react-router-dom";
import { Carousel } from "../components/Carousel";

export const LandingPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [inTheatres, setInTheatres] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const findPopular = await getPopularMovies();
      setPopularMovies(findPopular.data.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const findTrending = await trendingWeekMovies();
      setTrendingMovies(findTrending.data.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const findTopRated = await getTopRated();
      setTopRatedMovies(findTopRated.data.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const findInTheatres = await getInTheatres();
      setInTheatres(findInTheatres.data.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const findUpcoming = await getUpcomingMovies();
      setUpcomingMovies(findUpcoming.data.results);
    })();
  }, []);

  const handleList = async (list) => {
    setToggle(!toggle);
    if (list === "popular") {
      const findPopular = await getPopularMovies();
      setMoviesList(findPopular.data.results);
    }

    if (list === "trending") {
      const findTrending = await trendingWeekMovies();
      setMoviesList(findTrending.data.results);
    }

    if (list === "top rated" && toggle) {
      const findTopRated = await getTopRated();
      setMoviesList(findTopRated.data.results);
    }

    if (list === "in theatres") {
      const findInTheatres = await getInTheatres();
      setMoviesList(findInTheatres.data.results);
    }

    if (list === "upcoming") {
      const findUpcoming = await getUpcomingMovies();
      setMoviesList(findUpcoming.data.results);
    }
  };

  return (
    <div>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => handleList("popular")}>Popular Movies</button>
        <button onClick={() => handleList("trending")}>Trending Movies</button>
        <button onClick={() => handleList("top rated")}>
          Top Rated Movies
        </button>
        <button onClick={() => handleList("in theatres")}>In theatres</button>
        <button onClick={() => handleList("upcoming")}>Upcoming Movies</button>
      </div>
      <>
        {moviesList && toggle && (
          <section
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {moviesList.map((pop) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "30px",
                  }}
                  key={pop.id}
                >
                  {pop.poster_path ? (
                    <Link
                      to={`/movies/${pop.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200${pop.poster_path}`}
                        alt="movieposter"
                        style={{ width: "100px" }}
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/movies/${pop.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                        }
                        alt="movieposter"
                        style={{ width: "100px" }}
                      />
                    </Link>
                  )}
                  <p>
                    <small>{pop.title}</small>
                  </p>
                </div>
              );
            })}
          </section>
        )}
      </> */}
      <div>
        <h3>Popular Movies:</h3>
        {popularMovies.length && <Carousel movies={popularMovies} />}
      </div>

      <div>
        <h3>Trending Movies:</h3>
        {trendingMovies.length && <Carousel movies={trendingMovies} />}
      </div>
    </div>
  );
};

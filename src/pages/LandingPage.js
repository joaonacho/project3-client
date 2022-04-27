import React from "react";
import {
  randomFive,
  getUpcomingMovies,
  getInTheatres,
  getPopularMovies,
  getTopRated,
  trendingWeekMovies,
} from "../api";

import { useState } from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleList = async (list) => {
    if (list === "popular") {
      setToggle(!toggle);
      const findPopular = await getPopularMovies();
      setMoviesList(findPopular.data.results);
    }

    if (list === "trending") {
      setToggle(!toggle);
      const findTrending = await trendingWeekMovies();
      setMoviesList(findTrending.data.results);
    }

    if (list === "top rated") {
      setToggle(!toggle);
      const findTopRated = await getTopRated();
      setMoviesList(findTopRated.data.results);
    }

    if (list === "in theatres") {
      setToggle(!toggle);
      const findInTheatres = await getInTheatres();
      setMoviesList(findInTheatres.data.results);
    }

    if (list === "upcoming") {
      setToggle(!toggle);
      const findUpcoming = await getUpcomingMovies();
      setMoviesList(findUpcoming.data.results);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
      </>
    </div>
  );
};

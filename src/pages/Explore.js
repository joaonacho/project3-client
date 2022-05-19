import React from "react";
import { SearchMovie } from "../components/SearchMovie";
import { useState, useEffect } from "react";
import { Carousel } from "../components/Carousel";
import { getInTheatres, getPopularMovies, getTopRated } from "../api";

export const Explore = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [inTheatres, setInTheatres] = useState([]);

  useEffect(() => {
    (async () => {
      const findPopular = await getPopularMovies();
      setPopularMovies(findPopular.data.results);
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

  return (
    <>
      <div className="container">
        <div>
          <SearchMovie />
        </div>

        <main>
          <div className="container-section">
            <div>
              {topRatedMovies.length >= 1 && (
                <>
                  <div className="movie-filter">
                    <h2>Top Rated</h2>
                  </div>
                  <Carousel movies={topRatedMovies} />
                </>
              )}
            </div>

            <div>
              {inTheatres.length >= 1 && (
                <>
                  <div
                    className="movie-filter"
                    // style={{
                    //   backgroundColor: "purple",
                    //   width: "100%",
                    //   color: "whitesmoke",
                    // }}
                  >
                    <h2>In theatres</h2>
                  </div>
                  <Carousel movies={inTheatres} />
                </>
              )}
            </div>

            <div>
              {popularMovies.length >= 1 && (
                <>
                  <div
                    className="movie-filter"
                    // style={{
                    //   backgroundColor: "purple",
                    //   width: "100%",
                    //   color: "whitesmoke",
                    //   borderRadius: "0 8px 0 0",
                    // }}
                  >
                    <h2>Popular Movies</h2>
                  </div>
                  <Carousel movies={popularMovies} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

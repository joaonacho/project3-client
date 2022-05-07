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
      <div
        style={{
          backgroundColor: "black",
          paddingTop: "40px",
          width: "100%",
        }}
      >
        <SearchMovie />
      </div>

      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "650px",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            marginTop: "10%",
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <div>
            {topRatedMovies.length && (
              <>
                <div
                  style={{
                    backgroundColor: "purple",
                    width: "100%",
                    color: "whitesmoke",
                    borderRadius: "8px 0 0 0",
                  }}
                >
                  <h2>Top Rated</h2>
                </div>
                <Carousel movies={topRatedMovies} />
              </>
            )}
          </div>

          <div>
            {inTheatres.length && (
              <>
                <div
                  style={{
                    backgroundColor: "purple",
                    width: "100%",
                    color: "whitesmoke",
                  }}
                >
                  <h2>In theatres</h2>
                </div>
                <Carousel movies={inTheatres} />
              </>
            )}
          </div>

          <div>
            {popularMovies.length && (
              <>
                <div
                  style={{
                    backgroundColor: "purple",
                    width: "100%",
                    color: "whitesmoke",
                    borderRadius: "0 8px 0 0",
                  }}
                >
                  <h2>Popular Movies</h2>
                </div>
                <Carousel movies={popularMovies} />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

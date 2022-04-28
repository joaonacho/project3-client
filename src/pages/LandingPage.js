import React from "react";
import { useState, useEffect } from "react";
import {
  // randomFive,
  randomReviews,
  getUpcomingMovies,
  getInTheatres,
  getPopularMovies,
  getTopRated,
  trendingWeekMovies,
} from "../api";
import { Carousel } from "../components/Carousel";
import { format } from "timeago.js";

export const LandingPage = () => {
  // const [moviesList, setMoviesList] = useState([]);
  // const [toggle, setToggle] = useState(false);
  const [threeReviews, setThreeReviews] = useState([]);

  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [inTheatres, setInTheatres] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const reviews = await randomReviews();
      setThreeReviews(reviews.data);
      console.log(reviews.data);
    })();
  }, []);

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

  // const handleList = async (list) => {
  //   setToggle(!toggle);
  //   if (list === "popular") {
  //     const findPopular = await getPopularMovies();
  //     setMoviesList(findPopular.data.results);
  //   }

  //   if (list === "trending") {
  //     const findTrending = await trendingWeekMovies();
  //     setMoviesList(findTrending.data.results);
  //   }

  //   if (list === "top rated" && toggle) {
  //     const findTopRated = await getTopRated();
  //     setMoviesList(findTopRated.data.results);
  //   }

  //   if (list === "in theatres") {
  //     const findInTheatres = await getInTheatres();
  //     setMoviesList(findInTheatres.data.results);
  //   }

  //   if (list === "upcoming") {
  //     const findUpcoming = await getUpcomingMovies();
  //     setMoviesList(findUpcoming.data.results);
  //   }
  // };

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
      <section
        style={{
          // width: "30%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {threeReviews && (
          <>
            {threeReviews.map((review) => {
              return (
                <div style={{ width: "25%" }}>
                  <p>
                    <i>"{review.review}"</i>
                  </p>
                  <p>
                    <strong>{review.rating}</strong> <small> /10</small>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>
                      <small>
                        {review.author.username} about
                        <strong> {review.movie.title}</strong>
                      </small>
                    </p>

                    <p>
                      <small>{format(review.createdAt)}</small>
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </section>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          {trendingMovies.length && (
            <>
              <h3>Trending Movies:</h3> <Carousel movies={trendingMovies} />
            </>
          )}
        </div>

        <div>
          {upcomingMovies.length && (
            <>
              <h3>Upcoming Movies:</h3> <Carousel movies={upcomingMovies} />
            </>
          )}
        </div>

        <div>
          {inTheatres.length && (
            <>
              <h3>In theatres:</h3> <Carousel movies={inTheatres} />
            </>
          )}
        </div>

        <div>
          {topRatedMovies.length && (
            <>
              <h3>Top Rated Movies:</h3> <Carousel movies={topRatedMovies} />
            </>
          )}
        </div>

        <div>
          {popularMovies.length && (
            <>
              <h3>Popular Movies:</h3>
              <Carousel movies={popularMovies} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

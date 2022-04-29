import React from "react";
import { useState, useEffect } from "react";
import {
  randomReviews,
  getUpcomingMovies,
  trendingWeekMovies,
  randomFive,
} from "../api";
import { Carousel } from "../components/Carousel";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [threeReviews, setThreeReviews] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const fiveUsers = await randomFive();
      setRandomUsers(fiveUsers.data);
      console.log(fiveUsers.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const reviews = await randomReviews();
      setThreeReviews(reviews.data);
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
      const findUpcoming = await getUpcomingMovies();
      setUpcomingMovies(findUpcoming.data.results);
    })();
  }, []);

  return (
    <div>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row-reverse",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "15%",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            {trendingMovies.length && (
              <>
                <div
                  style={{
                    backgroundColor: "purple",
                    height: "35px",
                    color: "whitesmoke",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <h2>Trending Movies</h2>
                </div>
                <Carousel movies={trendingMovies} />
              </>
            )}
          </div>

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              color: "whitesmoke",
            }}
          >
            {upcomingMovies.length && (
              <>
                <div
                  style={{
                    backgroundColor: "purple",
                    height: "35px",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <h2>Upcoming Movies</h2>
                </div>
                <Carousel movies={upcomingMovies} />
              </>
            )}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
          height: "650px",
          backgroundColor: "purple",
          color: "whitesmoke",
        }}
      >
        {threeReviews && (
          <>
            {threeReviews.map((review) => {
              return (
                <div style={{ width: "20%" }}>
                  <p style={{ fontSize: "1.2rem" }}>
                    <i>"{review.review}"</i>
                  </p>
                  <p style={{ textAlign: "right" }}>
                    <strong style={{ color: "gold", fontSize: "1.8rem" }}>
                      {review.rating}
                    </strong>
                    <small> /10</small>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>
                      <small>
                        {review.author.username}
                        <br /> about
                        <strong> {review.movie.title}</strong>
                      </small>
                    </p>

                    <p>
                      <br />
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
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          height: "350px",
          backgroundColor: "ghostwhite",
        }}
      >
        <h1 style={{ textAlign: "center" }}>We love Cinema</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {randomUsers.length &&
            randomUsers.map((user) => {
              return (
                <article key={user._id}>
                  <Link to={`/profile/${user.username}`}>
                    <img
                      src={user.profileImg}
                      alt="userimage"
                      style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        boxShadow: "10px 10px 15px lightgrey",
                      }}
                    />
                  </Link>
                </article>
              );
            })}
        </div>
        <h1 style={{ textAlign: "center" }}>
          <em>And our users too!</em>
        </h1>
      </section>
    </div>
  );
};

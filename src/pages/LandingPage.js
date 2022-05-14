import React from "react";

import { useState, useEffect } from "react";
import {
  randomReviews,
  getUpcomingMovies,
  trendingWeekMovies,
  randomSix,
} from "../api";
import { Carousel } from "../components/Carousel";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import "animate.css";

export const LandingPage = () => {
  const [threeReviews, setThreeReviews] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const sixUsers = await randomSix();
      setRandomUsers(sixUsers.data.slice(0, 4));
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const reviews = await randomReviews();
      setThreeReviews(reviews.data);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const findTrending = await trendingWeekMovies();
      setTrendingMovies(findTrending.data.results);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const findUpcoming = await getUpcomingMovies();
      setUpcomingMovies(findUpcoming.data.results);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="bg-dark">
      <section className="container container-padding  center">
        <h1 className="fs-900 ff-sans-cond text-secondary-clr-medium-light">
          Connect with people who share the passion for the seventh art
        </h1>
      </section>

      {isLoading && (
        <div
          style={{
            height: "600px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: "0.8",
          }}
        >
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5"
            ></circle>
          </svg>
        </div>
      )}
      <section className=" animate__animated animate__fadeIn">
        <div className="container-section">
          <div className="container-carousel">
            {isLoading ? (
              <svg className="spinner" viewBox="0 0 50 50">
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
            ) : (
              <>
                {trendingMovies.length >= 1 && (
                  <>
                    <div className="movie-filter">
                      <h2>Trending Movies</h2>
                    </div>
                    <Carousel movies={trendingMovies} />
                  </>
                )}
              </>
            )}
          </div>

          <div className="container-carousel">
            {upcomingMovies.length && (
              <>
                <div className="movie-filter">
                  <h2>Upcoming Movies</h2>
                </div>
                <Carousel movies={upcomingMovies} />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary-clr-medium-light text-primary-clr-dark container-section background">
        <div className="container section-container">
          <h1 className="padding center ff-sans-cond fs-800 text-white">
            We love Cinema
          </h1>
          {threeReviews && (
            <>
              {threeReviews.map((review) => {
                return (
                  <div
                    className="container-review animate__animated animate__fadeInLeft"
                    key={review._id}
                  >
                    <p className="title">
                      <small>
                        {review.author.username}
                        <br /> about
                        <strong> {review.movie.title}</strong>
                      </small>
                    </p>
                    <p>
                      <i>"{review.review}"</i>
                    </p>

                    <p className="rating fs-700">
                      <strong>★ {review.rating}</strong>
                      <small> /10</small>
                    </p>
                    <div>
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
        </div>
      </section>

      <section className=" bg-white">
        <div className="container section-container">
          <h1 className="fs-800 center text-primary-clr-dark padding ff-sans-cond ">
            And our users too!
          </h1>
          <div className="container-user">
            {randomUsers.length &&
              randomUsers.map((user) => {
                return (
                  <article
                    key={user._id}
                    className="animate__animated animate__fadeIn"
                  >
                    <Link to={`/profile/${user.username}`}>
                      <img
                        className="user-image"
                        src={user.profileImg}
                        alt="userimage"
                      />
                    </Link>
                  </article>
                );
              })}
          </div>
        </div>
      </section>
      <footer className="center text-secondary-clr-light letter-spacing-2 ff-serif">
        <h5>Made with tears by JN & AG</h5>
        <a href={"https://developers.themoviedb.org/"} target="blank">
          <img
            src={"https://bit.ly/39YwFnl"}
            alt="TMDBlogo"
            style={{ width: "40px" }}
          />
        </a>
      </footer>
    </div>
  );
};

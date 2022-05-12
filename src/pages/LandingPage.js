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

export const LandingPage = () => {
  const [threeReviews, setThreeReviews] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const sixUsers = await randomSix();
      setRandomUsers(sixUsers.data.slice(0, 3));
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
    <div className="bg-dark">
      <section className="container container-padding  center">
        <h1 className="fs-900 ff-sans-cond">
          Connect with people who share the passion for the seventh art
        </h1>
        <h2 className="item text-accent ff-sans-normal">
          In aenean posuere lorem risus nec. Tempor tincidunt aenean purus purus
          vestibulum nibh mi venenatis
        </h2>
      </section>
      <section
        className="container-section"
        // style={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   flexDirection: "row-reverse",
        //   backgroundColor: "black",
        // }}
      >
        <div className="container-multiple-carousels">
          <div className="container-carousel">
            {trendingMovies.length && (
              <>
                <div>
                  <h2>Trending Movies</h2>
                </div>
                <Carousel movies={trendingMovies} />
              </>
            )}
          </div>

          <div className="container-carousel">
            {upcomingMovies.length && (
              <>
                <div>
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
                  <div className="container-review " key={review._id}>
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
                      <strong>{review.rating}</strong>
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
                  <article key={user._id}>
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
      </footer>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getSimilarMovies,
  addToFavourites,
  movieReview,
  getUser,
  removeFromFavourites,
  getMovieReviews,
} from "../api";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";
import { useContext } from "react";
import { MovieDetailCard } from "../components/MovieDetailCard";
import { MovieCardXS } from "../components/MovieCardXS";
import { ReviewForm } from "../components/ReviewForm";
import { MovieReviews } from "../components/MovieReviews";

export const MovieDetails = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [form, setForm] = useState(false);
  const [userInSession, setUserInSession] = useState({});
  const [userFavourites, setUserFavourites] = useState([]);
  const [moreSimilar, setMoreSimilar] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = await getUser(user.username);
      setUserInSession(userData.data);

      const favDataId = userData.data.favourites.map((movie) => {
        return movie.id;
      });

      setUserFavourites(favDataId);
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const getDetails = await getMovieDetails(movieId);
      setMovie(getDetails.data);
    })();
  }, [movieId]);

  useEffect(() => {
    (async () => {
      const movieReviewsFromDb = await getMovieReviews(movie.id);
      setMovieReviews(movieReviewsFromDb.data.reviews);
    })();
  }, [movie.id]);

  useEffect(() => {
    (async () => {
      const getSimilar = await getSimilarMovies(movieId);
      setSimilarMovies(getSimilar.data.results);
    })();
  }, [movieId]);

  const addMovie = (e) => {
    e.preventDefault();
    addToFavourites(movie);
    setUserFavourites([...userFavourites, movie.id]);
    toast.success(`${movie.title} was added to favourites`);
  };

  const removeMovie = async (movieId, user) => {
    await removeFromFavourites(movieId, user);

    const filteredFav = userFavourites.filter((movie) => {
      return movie !== parseInt(movieId);
    });
    setUserFavourites([...filteredFav]);

    toast.warning(`${movie.title} was removed from favourites`);
  };

  const handleForm = () => {
    form ? setForm(false) : setForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullReview = {
      review,
      rating,
      author: user._id,
      title: movie.title,
      genres: movie.genres,
      poster_path: movie.poster_path,
      tagline: movie.tagline,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      runtime: movie.runtime,
      id: movie.id,
      imdb_id: movie.imdb_id,
    };
    await movieReview(movieId, fullReview);
    setMovieReviews([...movieReviews, fullReview]);
    setForm(false);
    setReview();
    setRating();
    toast.success("Your rating was submited");
  };

  return (
    <div>
      <section>
        {movie && (
          <>
            <MovieDetailCard
              movie={movie}
              removeMovie={removeMovie}
              addMovie={addMovie}
              userFavourites={userFavourites}
              userInSession={userInSession}
              movieId={movieId}
            />
          </>
        )}
      </section>

      <section>
        {isLoggedIn && (
          <ReviewForm
            handleForm={handleForm}
            form={form}
            handleSubmit={handleSubmit}
            rating={rating}
            setRating={setRating}
            review={review}
            setReview={setReview}
          />
        )}
        {movieReviews && <MovieReviews movieReviews={movieReviews} />}
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!moreSimilar ? (
          <>
            <MovieCardXS similarMovies={similarMovies.slice(0, 10)} />
            <button
              style={{
                alignSelf: "center",
                backgroundColor: "plum",
                opacity: "0.8",
                padding: "4px",
                borderRadius: "10px",
                color: "purple",
                fontSize: "1rem",
                textAlign: "center",
              }}
              onClick={() => setMoreSimilar(!moreSimilar)}
            >
              show more
            </button>
          </>
        ) : (
          <>
            <MovieCardXS similarMovies={similarMovies} />
            <button
              style={{
                alignSelf: "center",
                backgroundColor: "plum",
                opacity: "0.8",
                padding: "4px",
                borderRadius: "10px",
                color: "purple",
                fontSize: "1rem",
                textAlign: "center",
              }}
              onClick={() => setMoreSimilar(!moreSimilar)}
            >
              show less
            </button>
          </>
        )}
      </section>
    </div>
  );
};

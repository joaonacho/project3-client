import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovieDetails,
  getSimilarMovies,
  addToFavourites,
  movieReview,
  getUser,
  removeFromFavourites,
} from "../api";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";
import { useContext } from "react";
import { MovieDetailCard } from "../components/MovieDetailCard";
import { MovieCardXS } from "../components/MovieCardXS";

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

            {isLoggedIn && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <button onClick={handleForm}>Make a review</button>
                  {form && (
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <label>Rating:</label>
                      <input
                        required
                        type="number"
                        min="0"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                      <label>Review:</label>
                      <textarea
                        required
                        cols="30"
                        rows="5"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      ></textarea>
                      <button type="submit">Submit</button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <section>
        <MovieCardXS similarMovies={similarMovies} />
      </section>
    </div>
  );
};

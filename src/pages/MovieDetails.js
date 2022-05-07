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
import { FaImdb } from "react-icons/fa";
import { BsBookmarkHeartFill, BsBookmarkCheckFill } from "react-icons/bs";

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
      setUserFavourites(userData.data.favourites);
    })();
  }, [user]);

  console.log(userFavourites);

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
    // setUserFavourites(...userFavourites, movie);
    toast.success(`${movie.title} was added to favourites`);
  };

  // const removeMovie = async (movieId, user) => {
  //   await removeFromFavourites(movieId, user);

  //   const filteredFav = userFavourites.filter((movie) => {
  //     return movie.id !== movieId;
  //   });
  //   setUserFavourites(...filteredFav);

  //   toast.warning(`${movie.title} was removed from favourites`);
  // };

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
      {movie && (
        <>
          <article
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "30px",
            }}
          >
            {/* {isLoggedIn &&
              userFavourites.length &&
              (userFavourites.includes(movieId) ? (
                <BsBookmarkHeartFill
                  onClick={addMovie}
                  style={{
                    fontSize: "2.3rem",
                    alignSelf: "center",
                    color: "purple",
                    marginLeft: "90px",
                    marginTop: "-3px",
                    position: "absolute",
                  }}
                />
              ) : (
                <BsBookmarkCheckFill
                  onClick={() => removeMovie(movieId, userInSession)}
                  style={{
                    fontSize: "2.3rem",
                    alignSelf: "center",
                    color: "lightgreen",
                    marginLeft: "90px",
                    marginTop: "-3px",
                    position: "absolute",
                  }}
                />
              ))} */}

            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt="movieposter"
                style={{ width: "200px", alignSelf: "center" }}
              />
            ) : (
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                }
                alt="movieposter"
                style={{ width: "200px", alignSelf: "center" }}
              />
            )}
            <h1 style={{ alignSelf: "center" }}>{movie.title}</h1>
            <h3 style={{ alignSelf: "center" }}>
              <i>{movie.tagline}</i>
            </h3>
            <p style={{ alignSelf: "center" }}>
              <small>Runtime: {movie.runtime} mins</small>
            </p>
            <div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {movie.genres &&
                  movie.genres.map((genre) => {
                    return (
                      <li key={genre.id}>
                        <small>
                          <strong>{genre.name}</strong>
                        </small>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <p>
                <small>Rating: {movie.vote_average}</small>
              </p>
              <p>
                <small>Release date: {movie.release_date}</small>
              </p>
            </div>
            <p style={{ alignSelf: "center" }}>{movie.overview}</p>

            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}/`}
              target="blank"
              style={{ alignSelf: "center" }}
            >
              <FaImdb style={{ color: "gold", fontSize: "3rem" }} />
            </a>

            {isLoggedIn && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <button onClick={addMovie} style={{ height: "30px" }}>
                  Add to favourites
                </button>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <button onClick={handleForm}>Make a review</button>
                  {form ? (
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
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </article>
        </>
      )}

      <h3 style={{ textAlign: "center" }}>Similar Movies:</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {similarMovies &&
          similarMovies.map((similar) => {
            return (
              <Link
                to={`/movies/${similar.id}`}
                key={similar.id}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    margin: "15px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {similar.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                      alt="movieposter"
                      style={{ width: "70px", alignSelf: "center" }}
                    />
                  ) : (
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                      }
                      alt="movieposter"
                      style={{ width: "70px", alignSelf: "center" }}
                    />
                  )}
                  <h4>
                    <i>{similar.title}</i>
                  </h4>
                  <p>
                    <small>Rating: {Math.round(similar.vote_average)}</small>
                  </p>
                </article>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

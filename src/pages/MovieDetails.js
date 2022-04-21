import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getSimilarMovies, addToFavourites } from "../api";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

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
      console.log(getSimilar.data.results);
    })();
  }, [movieId]);

  const addMovie = (e) => {
    e.preventDefault();
    addToFavourites(movie);
  };

  return (
    <div>
      {movie && (
        <>
          <article>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt="movieposter"
                style={{ width: "200px" }}
              />
            ) : (
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                }
                alt="movieposter"
              />
            )}
            <h1>{movie.title}</h1>
            <h3>
              <i>{movie.tagline}</i>
            </h3>
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
            <p>{movie.overview}</p>
            <button onClick={addMovie}>Add to favourites</button>
          </article>
        </>
      )}

      <h3>Similar Movies:</h3>
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
              <Link to={`/movies/${similar.id}`} key={similar.id}>
                <article style={{ margin: "15px" }}>
                  {similar.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                      alt="movieposter"
                      style={{ width: "70px" }}
                    />
                  ) : (
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                      }
                      alt="movieposter"
                      style={{ width: "70px" }}
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

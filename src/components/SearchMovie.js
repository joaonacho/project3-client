import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../api";
import "./SearchMovie.scss";

export const SearchMovie = () => {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filterMovieList = (e) => {
    setQuery(e.target.value);

    if (e.target.value === "") {
      setMovie([]);
    }
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        let movieFound = await searchMovie(e.target.value);
        setMovie(movieFound.data.results);
        setIsLoading(false);
      })();
    }, 1500);
  };

  const cleanUp = () => {
    setMovie([]);
    setQuery("");
  };

  return (
    <div className="search__container">
      <div className="search__input">
        <input
          className="input-find-friends"
          type="text"
          placeholder="Search movies"
          onChange={filterMovieList}
          value={query}
        />
      </div>

      <div
        className="padding"
        style={{
          marginBottom: "4rem ",
        }}
      >
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

        {movie &&
          movie.map((found, index) => {
            return (
              <>
                <Link
                  to={`/movies/${found.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="secondary-clr-medium-light"
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      border: "1px solid grey",
                      borderRadius: "1rem",
                      padding: "0.5rem 0.5rem",
                      margin: "0.3rem 0 ",
                    }}
                    onClick={cleanUp}
                  >
                    {found.poster_path ? (
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${found.poster_path}`}
                          alt="poster"
                          style={{
                            width: "100px",
                            padding: "5px",
                            borderRadius: "1rem",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                          }
                          alt="poster"
                          style={{
                            width: "100px",
                            padding: "5px",
                            borderRadius: "1rem",
                          }}
                        />
                      </>
                    )}
                    <div
                      className="text-secondary-clr-light "
                      style={{
                        textAlign: "right",
                        padding: "5px 2rem 5px 0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h2>
                        <i>{found.title}</i>
                      </h2>
                      <p style={{ color: "gold" }}>
                        <small>★ {found.vote_average}</small>
                      </p>
                      <p>
                        <small>{found.release_date}</small>
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
      </div>
    </div>
  );
};

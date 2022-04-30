import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../api";

export const SearchMovie = () => {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("");

  const filterMovieList = (e) => {
    setQuery(e.target.value);

    if (e.target.value === "") {
      setMovie([]);
    }

    setTimeout(() => {
      (async () => {
        let movieFound = await searchMovie(e.target.value);
        setMovie(movieFound.data.results);
      })();
    }, 1500);
  };

  const cleanUp = () => {
    setMovie([]);
    setQuery("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search movies"
        onChange={filterMovieList}
        value={query}
        style={{
          width: "20%",
          fontSize: "1rem",
          alignSelf: "center",
        }}
      />

      <div
        style={{
          alignSelf: "center",
          width: "40%",
          backgroundColor: "whitesmoke",
          marginTop: "20px",
        }}
      >
        {movie &&
          movie.map((found) => {
            return (
              <>
                <Link
                  to={`/movies/${found.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      border: "1px solid grey",
                    }}
                    onClick={cleanUp}
                  >
                    {found.poster_path ? (
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${found.poster_path}`}
                          alt="poster"
                          style={{ width: "100px", padding: "5px" }}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                          }
                          alt="poster"
                          style={{ width: "100px", padding: "5px" }}
                        />
                      </>
                    )}
                    <div
                      style={{
                        textAlign: "right",
                        padding: "5px",
                        color: "purple",
                      }}
                    >
                      <h2>
                        <i>{found.title}</i>
                      </h2>
                      <p>
                        <small>Rating: {found.vote_average}</small>
                      </p>
                      <p>
                        <small>Release: {found.release_date}</small>
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

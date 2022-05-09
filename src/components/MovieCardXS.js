import React from "react";
import { Link } from "react-router-dom";

export const MovieCardXS = ({ similarMovies }) => {
  return (
    <>
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
                style={{ textDecoration: "none", color: "whitesmoke" }}
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
                      src={`https://image.tmdb.org/t/p/w400${similar.poster_path}`}
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
    </>
  );
};

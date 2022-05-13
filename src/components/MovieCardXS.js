import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

import "./MovieCardXS.scss";

export const MovieCardXS = ({ similarMovies }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "30px",
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
                  className="animate__animated animate__fadeInLeft card-background"
                  style={{
                    margin: "15px",
                    display: "flex",
                    borderRadius: "8px 8px 8px 0",
                    flexDirection: "column",
                    boxShadow: "0 0 25px black",
                    width: "100px",
                  }}
                >
                  {similar.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w400${similar.poster_path}`}
                      alt="movieposter"
                      style={{
                        width: "100px",
                        alignSelf: "center",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  ) : (
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                      }
                      alt="movieposter"
                      style={{
                        width: "100px",
                        alignSelf: "center",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  )}
                  <p style={{ color: "gold", padding: "5px" }}>
                    ★ {Math.round(similar.vote_average)}
                  </p>
                  <h4 style={{ padding: "5px" }}>{similar.title}</h4>
                </article>
              </Link>
            );
          })}
      </div>
    </>
  );
};

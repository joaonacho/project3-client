import React from "react";
import { useContext } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { UserContext } from "../context/user.context";

export const MovieDetailCard = ({
  movie,
  removeMovie,
  addMovie,
  userFavourites,
  userInSession,
  movieId,
}) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{movie.title}</h1>
        <h4 style={{ textAlign: "center" }}>
          <i>{movie.tagline}</i>
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "5px",
          }}
        >
          <p style={{ marginLeft: "10px" }}>
            <small>Duration: {movie.runtime} mins</small>
          </p>
          <p style={{ marginRight: "10px" }}>
            <small>Released: {movie.release_date}</small>
          </p>
        </div>
        <div style={{ width: "100%" }}>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              listStyle: "none",
              marginLeft: "-30px",
            }}
          >
            {movie.genres &&
              movie.genres.map((genre) => {
                return (
                  <li
                    style={{
                      border: "1px solid purple",
                      borderRadius: "5px",
                      backgroundColor: "plum",
                      padding: "4px",
                      textAlign: "center",
                      color: "purple",
                    }}
                    key={genre.id}
                  >
                    <p>
                      <small>
                        <b>{genre.name}</b>
                      </small>
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
          alt="coverposter"
          style={{ width: "600px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt="movieposter"
            style={{
              width: "150px",
              height: "230px",
              marginTop: "-50px",
              borderRadius: "7px",
              boxShadow: "0px 0px 20px black",
            }}
          />
        ) : (
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
            }
            alt="movieposter"
            style={{
              width: "150px",
              height: "230px",
              marginTop: "-50px",
              borderRadius: "7px",
              boxShadow: "0px 0px 20px black",
            }}
          />
        )}

        {isLoggedIn &&
          userFavourites &&
          (userFavourites.includes(movie.id) ? (
            <BsBookmarkHeartFill
              onClick={() => removeMovie(movieId, userInSession)}
              style={{
                fontSize: "3rem",
                color: "firebrick",
                marginTop: "-50px",
                marginLeft: "-169.5px",
                position: "absolute",
              }}
            />
          ) : (
            <BsBookmarkPlusFill
              onClick={addMovie}
              style={{
                fontSize: "3rem",
                marginTop: "-50px",
                marginLeft: "-169.5px",
                position: "absolute",
                color: "plum",
                opacity: "0.7",
              }}
            />
          ))}

        <div
          style={{
            width: "225px",
            textAlign: "left",
            padding: "10px",
          }}
        >
          <p>{movie.overview}</p>
          <p
            style={{
              textAlign: "right",
              color: "gold",
              padding: "10px",
            }}
          >
            ★<b> {movie.vote_average}</b>
          </p>
        </div>
      </div>
    </article>
  );
};

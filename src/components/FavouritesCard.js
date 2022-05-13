import React from "react";
import { Link } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";
import "./MovieCardXS.scss";

export const FavouritesCard = ({ removeMovie, favList, user, newUser }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {favList.map((fav) => {
        return (
          <article
            className="animate__animated animate__fadeInLeft card-background"
            key={fav._id}
            style={{
              marginTop: "30px",
              width: "150px",
              borderRadius: "10px 10px 10px 0",
              boxShadow: "0 0 25px black",
            }}
          >
            <div>
              {user && user.username === newUser.username && (
                <>
                  <BsFillXCircleFill
                    onClick={() => removeMovie(fav.id, user)}
                    style={{
                      color: "firebrick",
                      fontSize: "1.5rem",
                      position: "absolute",
                      marginLeft: "-85px",
                      marginTop: "-12px",
                    }}
                  />
                </>
              )}
              <Link
                to={`/movies/${fav.id}`}
                style={{
                  textDecoration: "none",
                  color: "whitesmoke",
                }}
              >
                {fav.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${fav.poster_path}`}
                    alt="movieposter"
                    style={{ width: "150px", borderRadius: "10px 10px 0 0" }}
                  />
                ) : (
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                    }
                    alt="movieposter"
                    style={{ width: "150px", borderRadius: "10px 10px 0 0" }}
                  />
                )}
                <p
                  style={{ textAlign: "left", color: "gold", padding: "10px" }}
                >
                  <b>★ {fav.vote_average}</b>
                </p>
                <h3
                  style={{ textAlign: "left", padding: "10px" }}
                  className="fs-600 ff-sans-cond"
                >
                  {fav.title}
                </h3>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

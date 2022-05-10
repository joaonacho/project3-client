import React from "react";
import { Link } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";

export const FavouritesCard = ({ removeMovie, favList, user, newUser }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {favList.map((fav) => {
        return (
          <article
            key={fav._id}
            style={{
              marginTop: "30px",
              width: "150px",
              backgroundColor: "purple",
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
                      color: "red",
                      fontSize: "1.5rem",
                      position: "absolute",
                      marginLeft: "-12px",
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
                <p style={{ textAlign: "left", color: "gold", padding: "5px" }}>
                  ★ {fav.vote_average}
                </p>
                <h3 style={{ textAlign: "left", padding: "5px" }}>
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

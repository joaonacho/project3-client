import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUser, removeFromFavourites } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";

//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
// import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const Profile = () => {
  const { user } = useContext(UserContext);

  const { username } = useParams();
  const [newUser, setUser] = useState({});
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
      setUser(foundUser.data);
    })();
  }, [username]);

  useEffect(() => {
    (async () => {
      setFavList(newUser.favourites);
    })();
  }, [newUser.favourites]);

  const removeMovie = async (movieId, user) => {
    await removeFromFavourites(movieId, user);

    const movieRemoved = favList.filter((movie) => {
      return movie.id === movieId;
    });

    const newList = favList.filter((movie) => {
      return movie.id !== movieId;
    });

    setFavList(newList);
    toast.warning(`${movieRemoved[0].title} was removed from favourites`);
  };

  return (
    <div>
      {newUser && (
        <>
          <img
            src={newUser.profileImg}
            alt="profilepic"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
          {user && user.username === newUser.username && (
            <Link to={`/profile/${newUser.username}/edit`}>
              <BsFillPencilFill style={{ marginLeft: "300px" }} />
            </Link>
          )}
          <h2>{newUser.username}'s profile</h2>
          <h4>About me:</h4>
          <p>{newUser.about}</p>
          {newUser.country ? (
            <p>{newUser.country}</p>
          ) : (
            <p>Where are you from?</p>
          )}

          <h4>Favourite movie genres:</h4>
          <ul style={{ listStyle: "none" }}>
            {newUser.genres &&
              newUser.genres.map((genre, index) => {
                return <li key={index}>{genre}</li>;
              })}
          </ul>

          <Link to={`/profile/${newUser.username}/reviews`}>
            <button>See all reviews</button>
          </Link>

          {favList && (
            <>
              <h4>Favourites movie list:</h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {favList.map((fav) => {
                  return (
                    <article
                      key={fav._id}
                      style={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "25px",
                      }}
                    >
                      <div style={{ width: "30%" }}>
                        {user && user.username === newUser.username && (
                          <>
                            <BsFillXCircleFill
                              onClick={() => removeMovie(fav.id, user)}
                              style={{
                                color: "red",
                              }}
                            />
                          </>
                        )}
                        <Link
                          to={`/movies/${fav.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {fav.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${fav.poster_path}`}
                              alt="movieposter"
                            />
                          ) : (
                            <img
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                              }
                              alt="movieposter"
                            />
                          )}
                          <h3 style={{ textAlign: "center" }}>{fav.title}</h3>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

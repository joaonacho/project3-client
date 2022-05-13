import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getUser,
  removeFromFavourites,
  followUser,
  unfollowUser,
} from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";

import { FaUserPlus, FaUserCheck, FaUserEdit } from "react-icons/fa";
import { FavouritesCard } from "../components/FavouritesCard";
import "./Profile.scss";
import "animate.css";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams();
  const [newUser, setUser] = useState({});
  const [favList, setFavList] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [renderAgain, setRenderAgain] = useState(false);
  const [moreFav, setMoreFav] = useState(false);

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
      setUserFollowers([foundUser.data.followers._id]);
      setUser(foundUser.data);
    })();
  }, [username, renderAgain]);

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

  const handleFollow = async (name) => {
    await followUser(name, { user });
    setRenderAgain(!renderAgain);
    toast.success(`You're following ${newUser.username}`);
  };

  const handleUnfollow = async (name) => {
    await unfollowUser(name, { user });
    setRenderAgain(!renderAgain);
    toast.warn(`You're unfollowing ${newUser.username}`);
  };

  console.log(newUser.followers);

  return (
    <section className="container center bg-dark animate__animated animate__fadeIn">
      <div className="center profile-container">
        {newUser.followers && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ marginRight: "50px" }}>
              <Link
                to={`/profile/${newUser.username}/reviews`}
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                <p className="text-secondary-clr-medium-light fs-700 ff-sans-cond">
                  {newUser.reviews.length}
                </p>
                <p className="fs-500 ff-sans-cond">Reviews</p>
              </Link>
            </div>
            <div style={{ marginRight: "50px" }}>
              <Link
                to={`/${newUser.username}/followers`}
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                <p className="text-secondary-clr-medium-light fs-700 ff-sans-cond">
                  {newUser.followers.length}
                </p>
                <p className="fs-500 ff-sans-cond">Followers</p>
              </Link>
            </div>
            <div>
              <Link
                to={`/${newUser.username}/following`}
                style={{ textDecoration: "none", color: "whitesmoke" }}
              >
                <p className="text-secondary-clr-medium-light fs-700 ff-sans-cond">
                  {newUser.follows.length}
                </p>
                <p className="fs-500 ff-sans-cond">Following</p>
              </Link>
            </div>
          </div>
        )}
        {newUser && newUser.followers && (
          <>
            {user && user._id && user.username !== newUser.username && (
              <div>
                {!newUser.followers.includes(user._id) ? (
                  <FaUserPlus
                    onClick={() => handleFollow(newUser.username)}
                    style={{ color: "whitesmoke", fontSize: "2rem" }}
                  />
                ) : (
                  <FaUserCheck
                    onClick={() => handleUnfollow(newUser.username)}
                    style={{ color: "lightgreen", fontSize: "2rem" }}
                  />
                )}
              </div>
            )}
            <div className="profile-photo-group">
              <img
                className="profile-photo"
                src={newUser.profileImg}
                alt="profilepic"
              />
              {user && user.username === newUser.username && (
                <Link to={`/profile/${newUser.username}/edit`}>
                  <FaUserEdit
                    style={{
                      color: "gold",
                      fontSize: "2.5rem",
                      position: "absolute",
                      marginLeft: "-90px",
                      marginTop: "15px",
                    }}
                  />
                </Link>
              )}
            </div>

            <div className="profile-user">
              <h3 className="text-secondary-clr-medium-light fs-700 ff-sans-cond">
                {newUser.username}
              </h3>
              <p
                className="text-secondary-clr-light"
                style={{ marginTop: "10px" }}
              >
                From: {newUser.country}
              </p>
              <p style={{ marginTop: "10px" }}>{newUser.about}</p>
            </div>

            {newUser.genres && newUser.genres.length >= 1 && (
              <>
                <div
                  style={{ marginTop: "80px" }}
                  className="profile-fav-genres"
                >
                  <h3 className="text-secondary-clr-medium-light fs-500 ff-sans-cond">
                    Favourite genres:
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {newUser.genres.map((genre, index) => {
                      return (
                        <li
                          style={{
                            border: "1px solid grey",
                            borderRadius: "8px",
                            paddingTop: "7px",
                            paddingBottom: "7px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            textAlign: "center",
                            color: "whitesmoke",
                            // marginTop: "10px",
                            margin: "10px",
                          }}
                          key={index}
                        >
                          <p className="fs-600 ff-sans-cond">{genre}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}

            {newUser.reviews && newUser.reviews.length >= 1 && (
              <Link
                to={`/profile/${newUser.username}/reviews`}
                className="row"
                style={{ width: "250px" }}
              >
                <button style={{ width: "250px", marginTop: "20px" }}>
                  Movie reviews
                </button>
              </Link>
            )}

            <hr
              style={{
                width: "70%",
                backgroundColor: "plum",
                border: "1px solid plum ",
                marginTop: "100px",
                marginBottom: "100px",
              }}
            />

            {favList && favList.length >= 1 && (
              <>
                <h3
                  className="ff-sans-cond fs-700"
                  style={{ textAlign: "center" }}
                >
                  Favourites:
                </h3>
                {!moreFav ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: "20px",
                      }}
                    >
                      <FavouritesCard
                        removeMovie={removeMovie}
                        favList={favList.slice(0, 4)}
                        user={user}
                        newUser={newUser}
                      />
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        color: "grey",
                        marginTop: "30px",
                      }}
                      onClick={() => setMoreFav(!moreFav)}
                    >
                      show more ...
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: "20px",
                      }}
                    >
                      <FavouritesCard
                        removeMovie={removeMovie}
                        favList={favList}
                        user={user}
                        newUser={newUser}
                      />
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        color: "grey",
                        marginTop: "30px",
                      }}
                      onClick={() => setMoreFav(!moreFav)}
                    >
                      hide
                    </p>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

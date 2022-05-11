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

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams();
  const [newUser, setUser] = useState({});
  const [favList, setFavList] = useState([]);
  const [renderAgain, setRenderAgain] = useState(false);
  const [moreFav, setMoreFav] = useState(false);

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
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
    toast.success(`You're following ${newUser.username}`);
    setRenderAgain(!renderAgain);
  };

  const handleUnfollow = async (name) => {
    await unfollowUser(name, { user });
    toast.warn(`You're unfollowing ${newUser.username}`);
    setRenderAgain(!renderAgain);
  };

  return (
    <div>
      {newUser && (
        <>
          {user && user.username !== newUser.username && newUser.followers && (
            <>
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
            </>
          )}
          <img
            src={newUser.profileImg}
            alt="profilepic"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
          {user && user.username === newUser.username && (
            <Link to={`/profile/${newUser.username}/edit`}>
              <FaUserEdit
                style={{
                  marginLeft: "300px",
                  color: "gold",
                  fontSize: "1.5rem",
                }}
              />
            </Link>
          )}
          <h2>{newUser.username}'s profile</h2>
          <p>{newUser.country}</p>
          <p>{newUser.about}</p>

          {newUser.genres && newUser.genres.length >= 1 && (
            <>
              <h3>Favourite genres:</h3>
              <ul style={{ listStyle: "none" }}>
                {newUser.genres.map((genre, index) => {
                  return <li key={index}>{genre}</li>;
                })}
              </ul>
            </>
          )}

          {newUser.reviews && newUser.reviews.length >= 1 && (
            <Link to={`/profile/${newUser.username}/reviews`}>
              <button
                style={{
                  fontSize: "1rem",
                  borderRadius: "4px",
                  padding: "4px",
                  textAlign: "center",
                  color: "whitesmoke",
                  backgroundColor: "black",
                }}
              >
                See reviews
              </button>
            </Link>
          )}

          {favList && favList.length >= 1 && (
            <>
              <h3 style={{ textAlign: "center" }}>Favourites:</h3>
              {!moreFav ? (
                <>
                  <FavouritesCard
                    removeMovie={removeMovie}
                    favList={favList.slice(0, 4)}
                    user={user}
                    newUser={newUser}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      style={{
                        alignSelf: "center",
                        fontSize: "1rem",
                        borderRadius: "4px",
                        padding: "4px",
                        textAlign: "center",
                        color: "whitesmoke",
                        backgroundColor: "black",
                      }}
                      onClick={() => setMoreFav(!moreFav)}
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <FavouritesCard
                    removeMovie={removeMovie}
                    favList={favList}
                    user={user}
                    newUser={newUser}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      style={{
                        alignSelf: "center",
                        fontSize: "1rem",
                        borderRadius: "4px",
                        padding: "4px",
                        textAlign: "center",
                        color: "whitesmoke",
                        backgroundColor: "black",
                      }}
                      onClick={() => setMoreFav(!moreFav)}
                    >
                      -
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

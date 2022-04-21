import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUser, randomFive } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";

//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const Profile = () => {
  const { user } = useContext(UserContext);

  const { username } = useParams();
  const [newUser, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
      setUser(foundUser.data);
    })();
  }, [username]);

  const [fiveUsers, setFiveUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const randomUsers = await randomFive();
      setFiveUsers(randomUsers.data);
    })();
  }, []);

  return (
    <div>
      {newUser && (
        <>
          <img
            src={newUser.profileImg}
            alt="profilepic"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
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
        </>
      )}

      {user && user.username === newUser.username && (
        <Link to={`/profile/${newUser.username}/edit`}>
          <p>Edit profile</p>
        </Link>
      )}

      {fiveUsers &&
        fiveUsers.map((user) => {
          return (
            <div key={user._id}>
              <img
                src={user.profileImg}
                alt="profilepic"
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
              <p style={{ fontSize: "0.6rem" }}>{user.username}</p>
            </div>
          );
        })}
    </div>
  );
};

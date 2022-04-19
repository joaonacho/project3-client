import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { Link } from "react-router-dom";

//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const Profile = () => {
  //is it better to have every info in context or just the id and search in DB?
  const { username } = useParams();
  const [newUser, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
      setUser(foundUser.data);
      // console.log(foundUser.data);
    })();
  }, []);

  return (
    <div>
      <h3>Welcome</h3>
      {newUser && (
        <>
          <img src={newUser.profileImg} alt="profilepic" />
          <h2>{newUser.username}'s profile</h2>
          <h3>{newUser.about}</h3>
          {newUser.country ? (
            <p>{newUser.country}</p>
          ) : (
            <p>Where are you from?</p>
          )}

          {newUser.genres &&
            newUser.genres.map((genre) => {
              return (
                <ul>
                  <li>{genre}</li>
                </ul>
              );
            })}
        </>
      )}
      <Link to={`/profile/${newUser.username}/edit`}>
        <p>Edit profile</p>
      </Link>
    </div>
  );
};

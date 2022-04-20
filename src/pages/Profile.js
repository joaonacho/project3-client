import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { Link } from "react-router-dom";

//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const Profile = () => {
  const { username } = useParams();
  const [newUser, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
      setUser(foundUser.data);
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
      <Link to={`/profile/${newUser.username}/edit`}>
        <p>Edit profile</p>
      </Link>
    </div>
  );
};

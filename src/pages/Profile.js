import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { getUser } from "../api";

//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const Profile = () => {
  //is it better to have every info in context or just the id and search in DB?

  // const userId = useParams();
  // console.log(userId.userId);
  const { user } = useContext(UserContext);
  // const [newUser, setUser] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     const foundUser = await getUser(user._id);
  //     setUser(foundUser.data);
  //     console.log(foundUser.data);
  //   })();
  // }, [user._id]);

  return (
    <div>
      <h3>Welcome</h3>
      {user && (
        <>
          <img src={user.profileImg} alt="profilepic" />
          <h2>{user.username}'s profile</h2>
          <h3>Email adress: {user.email}</h3>
          {user.country ? <p>{user.country}</p> : <p>Where are you from?</p>}
        </>
      )}
    </div>
  );
};

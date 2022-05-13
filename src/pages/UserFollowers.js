import React, { useState, useEffect } from "react";
import { getFollowers } from "../api";
import { Link, useParams } from "react-router-dom";

export const UserFollowers = () => {
  const { username } = useParams();
  const [userFollowers, setUserFollowers] = useState([]);

  useEffect(() => {
    (async () => {
      const followers = await getFollowers(username);
      setUserFollowers(followers.data.followers);
    })();
  }, [username]);

  return (
    <section
      style={{ marginTop: "80px" }}
      className="animate__animated animate__fadeInDown"
    >
      {userFollowers && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <h1
            className="fs-700 ff-sans-cond text-secondary-clr-medium-light"
            style={{ marginBottom: "40px" }}
          >
            {username}'s followers
          </h1>
          {userFollowers.map((follower) => {
            return (
              <article
                className="animate__animated animate__fadeInDown card-background"
                key={follower._id}
                style={{
                  marginTop: "-6px",
                  width: "350px",
                  height: "80px",
                  borderRadius: "10px 10px 10px 0",
                  boxShadow: "-5px 0 15px black",
                }}
              >
                <Link
                  to={`/profile/${follower.username}`}
                  style={{ textDecoration: "none", color: "whitesmoke" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                    }}
                  >
                    <img
                      src={follower.profileImg}
                      alt="profilepicture"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "0px 10px 10px 0",
                      }}
                    />
                    <div style={{ paddingLeft: "20px", paddingTop: "10px" }}>
                      <h2 className="fs-700 ff-sans-cond">
                        {follower.username}
                      </h2>
                      <p style={{ color: "grey" }}>
                        <small>{follower.country}</small>
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
          <Link
            to={`/profile/${username}`}
            style={{
              textDecoration: "none",
              color: "grey",
              marginTop: "30px",
            }}
          >
            <p>Go back</p>
          </Link>
        </div>
      )}
    </section>
  );
};

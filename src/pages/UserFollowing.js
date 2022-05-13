import React, { useState, useEffect } from "react";
import { getFollowing } from "../api";
import { Link, useParams } from "react-router-dom";

export const UserFollowing = () => {
  const { username } = useParams();
  const [userFollowing, setUserFollowing] = useState([]);

  useEffect(() => {
    (async () => {
      const following = await getFollowing(username);
      setUserFollowing(following.data.follows);
    })();
  }, [username]);

  return (
    <section
      style={{ marginTop: "80px" }}
      className="animate__animated animate__fadeInDown"
    >
      {userFollowing && (
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
            {username}'s follows
          </h1>
          {userFollowing.map((follow) => {
            return (
              <article
                className="animate__animated animate__fadeInDown card-background"
                key={follow._id}
                style={{
                  marginTop: "-6px",
                  width: "350px",
                  height: "80px",
                  borderRadius: "10px 10px 10px 0",
                  boxShadow: "-5px 0 15px black",
                }}
              >
                <Link
                  to={`/profile/${follow.username}`}
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
                      src={follow.profileImg}
                      alt="profilepicture"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "0px 10px 10px 0",
                      }}
                    />
                    <div style={{ paddingLeft: "20px", paddingTop: "10px" }}>
                      <h2 className="fs-700 ff-sans-cond">{follow.username}</h2>
                      <p style={{ color: "grey" }}>
                        <small>{follow.country}</small>
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

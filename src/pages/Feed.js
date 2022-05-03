import React from "react";
import { getFeed } from "../api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { CreatePost } from "../components/CreatePost";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const Feed = () => {
  const { user } = useContext(UserContext);
  const [feed, setFeed] = useState([]);
  const [makePost, setMakePost] = useState(false);

  useEffect(() => {
    (async () => {
      const userFeed = await getFeed(user.username);
      let sortedFeed = userFeed.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFeed(sortedFeed);
    })();
  }, [user, makePost]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <button onClick={() => setMakePost(!makePost)}>Make a post!</button>
      {makePost && <CreatePost />}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {feed &&
          feed.map((post) => {
            return (
              <article
                key={post._id}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <img
                    src={post.author.profileImg}
                    alt="profilepicture"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <Link
                    to={`/profile/${post.author.username}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p style={{ marginLeft: "10px", marginTop: "8px" }}>
                      <strong>{post.author.username}</strong>
                    </p>
                  </Link>
                </div>
                <img
                  src={post.poster}
                  alt="coverimage"
                  style={{
                    width: "25%",
                    maxHeight: "3000px",
                    marginTop: "10px",
                    alignSelf: "center",
                  }}
                />
                <div style={{ width: "25%", alignSelf: "center" }}>
                  <p style={{ marginTop: "10px", textAlign: "left" }}>
                    {post.content}
                  </p>
                  <p style={{ textAlign: "right" }}>
                    <small>
                      <i>{format(post.createdAt)}</i>
                    </small>
                  </p>
                </div>
              </article>
            );
          })}
      </section>
    </div>
  );
};

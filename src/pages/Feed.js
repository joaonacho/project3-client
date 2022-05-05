import React from "react";
import { getFeed } from "../api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";

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
            return <Post key={post._id} post={post} />;
          })}
      </section>
    </div>
  );
};

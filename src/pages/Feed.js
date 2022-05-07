import React from "react";
import { getFeed } from "../api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";
// import { FaCommentAlt } from "react-icons/fa";

export const Feed = () => {
  const { user } = useContext(UserContext);
  const [feed, setFeed] = useState([]);

  const addPost = (post) => {
    setFeed([post, ...feed]);
  };

  const removePost = (post) => {
    const newFeed = feed.filter((removed) => {
      return removed._id !== post;
    });
    setFeed(newFeed);
  };

  const addLike = (postId, userId) => {
    const newFeed = [...feed];
    const postToLike = newFeed.find((post) => post._id === postId);
    postToLike.likes = postToLike.likes.concat(userId);

    setFeed(newFeed);
  };

  const removeLike = (postId, userId) => {
    const newFeed = [...feed];
    const postToLike = newFeed.find((post) => post._id === postId);
    postToLike.likes = postToLike.likes.filter((user) => user !== userId);

    setFeed(newFeed);
  };

  useEffect(() => {
    (async () => {
      const userFeed = await getFeed(user.username);
      let sortedFeed = userFeed.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFeed(sortedFeed);
    })();
  }, [user]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CreatePost addPost={addPost} />

      <section
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {feed &&
          feed.map((post) => {
            return (
              <Post
                removePost={removePost}
                removeLike={removeLike}
                addLike={addLike}
                key={post._id}
                post={post}
              />
            );
          })}
      </section>
    </div>
  );
};

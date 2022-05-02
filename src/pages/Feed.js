import React from "react";
import { getFeed } from "../api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";

export const Feed = () => {
  const { user } = useContext(UserContext);
  //   const [feed, setFeed] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //   useEffect(() => {
  //     (async () => {
  //       const userFeed = await getFeed(user.username);
  //       setFeed(userFeed.data);
  //     })();
  //   }, [user]);

  return (
    <div>
      Feed
      <form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          cols="30"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

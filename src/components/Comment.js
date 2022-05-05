import React from "react";
import { createComment, getComments } from "../api";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { FaRegPaperPlane } from "react-icons/fa";

export const Comment = ({ postId }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [commentsInPost, setCommentsInPost] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    (async () => {
      const foundComments = await getComments(postId);
      setCommentsInPost(foundComments.data.comments);
    })();
  }, [postId, render]);

  const handleSubmit = async (e, post) => {
    e.preventDefault();
    const submitComment = { comment: comment, user: user._id };
    await createComment(post, submitComment);
    setRender(!render);
    setComment("");
  };

  return (
    <div
      style={{
        width: "50%",
        marginTop: "10px",
      }}
    >
      {commentsInPost &&
        commentsInPost.map((comment) => {
          return (
            <article
              style={{
                backgroundColor: "purple",
                borderRadius: "15px 0px 15px 15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={comment.author.profileImg}
                  alt="profilepicture"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                />
                <p style={{ marginTop: "8px", marginLeft: "10px" }}>
                  <small>{comment.author.username}</small>
                </p>
              </div>
              <div
                style={{
                  textAlign: "left",
                  marginLeft: "45px",
                }}
              >
                <p>{comment.content}</p>
                <p
                  style={{
                    textAlign: "right",
                    marginRight: "10px",
                  }}
                >
                  <small>{format(comment.createdAt)}</small>
                </p>
              </div>
            </article>
          );
        })}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <form onSubmit={(e) => handleSubmit(e, postId)}>
          <input
            type="text"
            placeholder="leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <FaRegPaperPlane
            style={{ color: "lightgreen", fontSize: "1.2rem" }}
          />

          <button type="submit">comment</button>
        </form>
      </div>
    </div>
  );
};
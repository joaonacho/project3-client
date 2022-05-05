import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
import { BsCursor } from "react-icons/bs";
import { BsHeart, BsHeartFill, BsFillXCircleFill } from "react-icons/bs";
import { deletePost, likePost, dislikePost } from "../api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

export const Post = ({ post }) => {
  const { user } = useContext(UserContext);

  const handleDelete = async (postId) => {
    await deletePost(postId);
    toast.warn("Post deleted!");
  };

  return (
    <div>
      {post && (
        <article
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "50%",
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
              width: "50%",
              maxHeight: "3000px",
              marginTop: "10px",
              alignSelf: "center",
            }}
          />
          <div style={{ width: "50%", alignSelf: "center" }}>
            <p style={{ marginTop: "10px", textAlign: "left" }}>
              {post.content}
            </p>
            <p style={{ textAlign: "right" }}>
              <small>
                <i>{format(post.createdAt)}</i>
              </small>
            </p>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {!post.likes.includes(user._id) && (
                  <BsHeart
                    id="likeBtn"
                    onClick={() => likePost(post._id, user._id)}
                    style={{ fontSize: "1.5rem" }}
                  />
                )}

                {post.likes.includes(user._id) && (
                  <BsHeartFill
                    onClick={() => dislikePost(post._id, user._id)}
                    style={{ color: "red", fontSize: "1.5rem" }}
                  />
                )}
                {post.likes.length === 1 ? (
                  <p style={{ marginLeft: "5px" }}>{post.likes.length} like</p>
                ) : (
                  <p style={{ marginLeft: "5px" }}>{post.likes.length} likes</p>
                )}
              </div>

              {user && (
                <>
                  {user.username === post.author.username && (
                    <BsFillXCircleFill
                      style={{
                        color: "red",
                        fontSize: "1.2rem",
                      }}
                      onClick={() => handleDelete(post._id)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Comment postId={post._id} />
          </div>
        </article>
      )}
    </div>
  );
};

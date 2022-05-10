import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const MovieReviews = ({ movieReviews }) => {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        padding: "10px",
      }}
    >
      {movieReviews.length >= 1 ? (
        <div style={{ textAlign: "center" }}>
          <h3>Reviews from our users:</h3>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>Be the first to review this movie!</h3>
        </div>
      )}

      {movieReviews.map((review) => {
        return (
          <div
            key={review._id}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {review.author.username && review.author.profileImg && (
              <Link
                to={`/profile/${review.author.username}`}
                style={{
                  textDecoration: "none",
                  color: "whitesmoke",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={review.author.profileImg}
                    alt="profilepicture"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <p style={{ marginLeft: "10px" }}>{review.author.username}</p>
                </div>
              </Link>
            )}
            <p style={{ color: "gold" }}>
              ★ <b>{review.rating}</b> <small>/10</small>
            </p>
            <p>
              <i>"{review.review}"</i>
            </p>
            <p style={{ alignSelf: "flex-end" }}>
              <small>{format(review.createdAt)}</small>
            </p>
          </div>
        );
      })}
    </article>
  );
};

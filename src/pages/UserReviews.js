import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserReviews, editReview, deleteReview } from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import { FaWrench, FaTrashAlt, FaCheck } from "react-icons/fa";
import "animate.css";
import "../components/MovieCardXS.scss";

//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const UserReviews = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const { username } = useParams();
  const [editingMovie, setEditingMovie] = useState([]);
  const [renderAgain, setRenderAgain] = useState(false);

  useEffect(() => {
    (async () => {
      const getReviews = await getUserReviews(username);
      setReviews(getReviews.data.reviews);
    })();
  }, [username, renderAgain]);

  const handleForm = (reviewId) => {
    if (editingMovie.length === 0 || editingMovie._id !== reviewId) {
      const reviewToEdit = reviews.filter((rev) => {
        return rev._id === reviewId;
      });
      setEditingMovie(reviewToEdit[0]);
    } else {
      setEditingMovie([]);
    }
  };

  const handleSubmit = async (e, reviewId) => {
    e.preventDefault();
    await editReview(reviewId, { editingMovie });
    setEditingMovie([]);
    setRenderAgain(!renderAgain);
    toast.success("Review saved!");
  };

  const handleDelete = async (reviewId) => {
    await deleteReview(reviewId);
    toast.error("Review deleted!");
    setRenderAgain(!renderAgain);
  };

  return (
    <>
      <Link
        to={`/profile/${username}`}
        style={{
          textDecoration: "none",
          color: "grey",
        }}
      >
        <p
          className="animate__animated animate__fadeInLeft"
          style={{ marginLeft: "20px", marginTop: "20px" }}
        >
          Go back
        </p>
      </Link>

      <h1
        className="fs-700 ff-sans-cond text-secondary-clr-medium-light animate__animated animate__fadeInLeft"
        style={{ marginBottom: "20px", marginTop: "40px", textAlign: "center" }}
      >
        {username}'s reviews
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "20px",
        }}
      >
        {reviews &&
          reviews.map((review) => {
            return (
              <article
                className="animate__animated animate__fadeInLeft card-background"
                key={review._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "200px",
                  marginTop: "30px",
                  backgroundColor: "purple",
                  borderRadius: "10px 10px 10px 0",
                }}
              >
                {user && user.username === username && (
                  <div
                    style={{
                      position: "absolute",
                      width: "190px",
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <FaWrench
                      style={{ color: "grey", fontSize: "1.5rem" }}
                      onClick={() => handleForm(review._id)}
                    />

                    {editingMovie._id === review._id && (
                      <FaTrashAlt
                        className="animate__animated animate__fadeIn"
                        style={{ color: "red", fontSize: "1.5rem" }}
                        onClick={() => handleDelete(review._id)}
                      />
                    )}
                  </div>
                )}

                {review.movie.poster_path ? (
                  <>
                    <Link
                      to={`/movies/${review.movie.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w400${review.movie.poster_path}`}
                        alt="poster"
                        style={{
                          width: "200px",
                          borderRadius: "10px 10px 0 0",
                        }}
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/movies/${review.movie.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJby-2uSy9qY_gzWp4SeAu3E96d4DEc6EAg&usqp=CAU"
                        }
                        alt="poster"
                        style={{
                          width: "200px",
                          borderRadius: "10px 10px 0 0",
                        }}
                      />
                    </Link>
                  </>
                )}
                <h3
                  className="fs-700 ff-sans-cond"
                  style={{
                    marginTop: "20px",
                    alignSelf: "flex-start",
                    padding: "10px",
                  }}
                >
                  {review.movie.title}
                </h3>

                <div
                  style={{
                    marginTop: "20px",
                    width: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {review._id === editingMovie._id && (
                    <>
                      <textarea
                        className="animate__animated animate__fadeIn"
                        style={{ width: "200px" }}
                        required
                        cols="30"
                        rows="5"
                        value={editingMovie.review}
                        onChange={(e) =>
                          setEditingMovie({
                            ...editingMovie,
                            review: e.target.value,
                          })
                        }
                      ></textarea>
                      <input
                        className="animate__animated animate__fadeIn"
                        required
                        type="number"
                        min="0"
                        max="10"
                        value={editingMovie.rating}
                        onChange={(e) =>
                          setEditingMovie({
                            ...editingMovie,
                            rating: parseInt(e.target.value),
                          })
                        }
                      />

                      <FaCheck
                        className="animate__animated animate__fadeIn"
                        style={{
                          fontSize: "1.4rem",
                          color: "lightgreen",
                          marginTop: "10px",
                        }}
                        onClick={(e) => handleSubmit(e, review._id)}
                      />
                    </>
                  )}

                  {review._id !== editingMovie._id && (
                    <div style={{ width: "200px" }}>
                      <p style={{ padding: "10px", textAlign: "left" }}>
                        <i>"{review.review}"</i>
                      </p>

                      <p style={{ padding: "10px", color: "grey" }}>
                        <small>{format(review.createdAt)}</small>
                      </p>

                      <p
                        style={{
                          textAlign: "right",
                          padding: "10px",
                          color: "gold",
                          fontSize: "1.5rem",
                        }}
                      >
                        <strong>★ {review.rating}</strong>
                        <small>/10</small>
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
};

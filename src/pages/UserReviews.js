import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserReviews, editReview, deleteReview } from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import { FaWrench, FaRegTrashAlt, FaCheck } from "react-icons/fa";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {reviews &&
        reviews.map((review) => {
          return (
            <article
              key={review._id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "300px",
                marginTop: "30px",
              }}
            >
              {user && user.username === username && (
                <div
                  style={{
                    width: "145px",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <FaWrench
                    style={{ color: "whitesmoke", fontSize: "1.2rem" }}
                    onClick={() => handleForm(review._id)}
                  />

                  {editingMovie._id === review._id && (
                    <FaRegTrashAlt
                      style={{ color: "red", fontSize: "1.2rem" }}
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
                      src={`https://image.tmdb.org/t/p/w200${review.movie.poster_path}`}
                      alt="poster"
                      style={{ width: "150px" }}
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
                      style={{ width: "150px" }}
                    />
                  </Link>
                </>
              )}
              <h3 style={{ marginTop: "20px" }}>
                <strong>{review.movie.title}</strong>
              </h3>

              <div style={{ width: "290px" }}>
                {review._id === editingMovie._id && (
                  <>
                    <textarea
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
                      style={{
                        fontSize: "1.4rem",
                        color: "lightgreen",
                        marginLeft: "10px",
                      }}
                      onClick={(e) => handleSubmit(e, review._id)}
                    />
                  </>
                )}

                {review._id !== editingMovie._id && (
                  <>
                    <p style={{ marginTop: "20px" }}>
                      <i>"{review.review}"</i>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      <strong style={{ color: "gold", fontSize: "1.8rem" }}>
                        {review.rating}
                      </strong>
                      <small>/10</small>
                    </p>
                  </>
                )}
              </div>
              <p>
                <small>{format(review.createdAt)}</small>
              </p>
            </article>
          );
        })}
    </div>
  );
};

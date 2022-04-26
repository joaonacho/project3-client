import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserReviews, editReview } from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//Timeago.js tells how many weeks, days, hours or seconds a comment/Post was made
import { format } from "timeago.js";
//To use just use format(something.createdAt) -> comes from timestamps

export const UserReviews = () => {
  const navigate = useNavigate();
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
    await editReview(reviewId, editingMovie);
    setEditingMovie([]);
    setRenderAgain(!renderAgain);
    toast.success("Review saved!");
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
              }}
            >
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
              <h3>{review.movie.title}</h3>

              <div style={{ width: "290px" }}>
                {review._id === editingMovie._id && (
                  <form onSubmit={(e) => handleSubmit(e, review._id)}>
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

                      <label>Review:</label>
                    </>
                    <button type="submit">Save</button>
                  </form>
                )}

                {review._id !== editingMovie._id && (
                  <>
                    <p>
                      <i>"{review.review}"</i>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      <strong>{review.rating}</strong> <small>/10</small>
                    </p>
                  </>
                )}

                {/* <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={handleSubmit}
                >
                  <label>Rating:</label>
                  <textarea
                    required
                    type="number"
                    min="0"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  ></textarea>
                  <label>Review:</label>
                </form> */}
              </div>
              <p>
                <small>{format(review.createdAt)}</small>
              </p>

              <button onClick={() => handleForm(review._id)}>Edit</button>
            </article>
          );
        })}
    </div>
  );
};

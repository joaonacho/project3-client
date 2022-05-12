import React from "react";

export const ReviewForm = ({
  handleForm,
  form,
  handleSubmit,
  rating,
  setRating,
  review,
  setReview,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleForm}
          style={{
            alignSelf: "center",
            border: "1px solid grey",
            borderRadius: "4px",
            color: "whitesmoke",
            fontSize: "1rem",
            paddingRight: "20px",
            paddingLeft: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "darkmagenta",
          }}
        >
          Leave a review
        </button>
        {form && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label>Rating:</label>
            <input
              required
              type="number"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <label>Review:</label>
            <textarea
              required
              cols="30"
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};
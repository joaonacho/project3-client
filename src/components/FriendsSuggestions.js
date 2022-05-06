import React from "react";
import { Link } from "react-router-dom";

export const FriendsSuggestions = ({ users }) => {
  return (
    <>
      {users && (
        <article
          key={users._id}
          style={{
            border: "2px solid purple",
            width: "15%",
            margin: "20px",
            borderRadius: "10px",
          }}
        >
          <Link
            to={`/profile/${users.username}`}
            style={{ textDecoration: "none", color: "whitesmoke" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
                src={users.profileImg}
                alt="profilepicture"
              />

              <p>{users.username}</p>
              <p style={{ textAlign: "center" }}>
                <small>{users.country}</small>
              </p>
            </div>
          </Link>
        </article>
      )}
    </>
  );
};

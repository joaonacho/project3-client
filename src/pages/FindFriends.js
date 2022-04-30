import React from "react";
import { searchUsers } from "../api";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

export const FindFriends = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuery = query.toLowerCase().replace(" ", "");

    if (!newQuery.length) {
      setUsers([]);
    }

    const usersInDb = await searchUsers(newQuery);
    const filterUser = usersInDb.data.filter((person) => {
      return person.username !== user.username;
    });

    setUsers(filterUser);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
    setTimeout(() => {
      handleSubmit(e);
    }, 500);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignSelf: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <BsSearch style={{ marginRight: "5px" }} />
          <input
            name={query}
            type="text"
            onChange={(e) => handleQuery(e)}
            placeholder="Search users"
          />
        </form>
      </div>
      <div
        style={{
          alignSelf: "center",
          backgroundColor: "whitesmoke",
          width: "40%",
          marginTop: "20px",
        }}
      >
        {users.length > 0 &&
          users.map((person) => {
            return (
              <Link
                to={`/profile/${person.username}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  key={person._id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    border: "1px solid grey",
                  }}
                >
                  <img
                    src={person.profileImg}
                    alt="profilepic"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                  />
                  <div
                    style={{
                      textAlign: "right",
                      padding: "5px",
                      color: "purple",
                    }}
                  >
                    <h2>{person.username}</h2>
                    <p>
                      <small>{person.country}</small>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
};

import React from "react";
import { searchUsers, getUsersGenres, randomSix } from "../api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FriendsSuggestions } from "../components/FriendsSuggestions";

export const FindFriends = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [userGenres, setUserGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const usersSameGenres = await getUsersGenres(user.username);

      if (usersSameGenres.data.length) {
        setUserGenres(usersSameGenres.data);
      }

      if (!usersSameGenres.data.length) {
        const fiveRandomUsers = await randomSix();
        const filterUsers = fiveRandomUsers.data.filter((randomUser) => {
          return randomUser.username !== user.username;
        });
        setRandomUsers(filterUsers);
      }
    })();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query === "") {
      setUsers([]);
    }

    const newQuery = query.toLowerCase().replace(" ", "");
    const usersInDb = await searchUsers(newQuery);
    const filterUser = usersInDb.data.filter((person) => {
      return person.username !== user.username;
    });

    setUsers(filterUser);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
    if (query === "") {
      setUsers([]);
    }
    setTimeout(() => {
      handleSubmit(e);
    }, 500);
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <input
          name={query}
          type="text"
          onChange={(e) => handleQuery(e)}
          placeholder="Search by username"
        />
        <FiSearch
          style={{
            marginLeft: "5px",
            fontSize: "1.8rem",
            color: "gold",
          }}
          onClick={handleSubmit}
        />
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
                key={person._id}
              >
                <div
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "600px",
        }}
      >
        {userGenres.length > 1 ? (
          <h2>People you may like based on your favourite movie genres:</h2>
        ) : (
          <h2>People you may like:</h2>
        )}

        <div
          style={{
            marginTop: "40px",
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {userGenres && userGenres.length > 1
            ? userGenres.map((user) => {
                return <FriendsSuggestions key={user._id} users={user} />;
              })
            : randomUsers.map((user) => {
                return <FriendsSuggestions key={user._id} users={user} />;
              })}
        </div>
      </div>
    </section>
  );
};

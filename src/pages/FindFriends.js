import React from "react";
import { searchUsers, getUsersGenres, randomSix } from "../api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FriendsSuggestions } from "../components/FriendsSuggestions";
import "./FindFriends.scss";

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
        setUserGenres(usersSameGenres.data.slice(0, 6));
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
    <div className="container">
      <section>
        <div class="search__container">
          <div className="search__input">
            <input
              name={query}
              type="text"
              onChange={(e) => handleQuery(e)}
              placeholder="Search by username"
            />
            <FiSearch onClick={handleSubmit} />
          </div>
        </div>
        <div>
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
      </section>
      <section>
        <div className="container-sugestions">
          {userGenres.length > 1 ? (
            <h2>People you may like based on your favourite movie genres:</h2>
          ) : (
            <h2>People you may like:</h2>
          )}
          <div>
            <div className="container-grid">
              {userGenres && userGenres.length > 1
                ? userGenres.map((user) => {
                    return (
                      <div>
                        <FriendsSuggestions key={user._id} users={user} />
                      </div>
                    );
                  })
                : randomUsers.map((user) => {
                    return (
                      <div>
                        <FriendsSuggestions key={user._id} users={user} />
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

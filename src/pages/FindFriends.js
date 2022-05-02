import React from "react";
import { searchUsers } from "../api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

export const FindFriends = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const foundUsers = await searchUsers();
      setUsers(foundUsers.data);
    })();
  }, [user.username]);

  const filteredUsers = users.filter((client) => {
    return client._id !== user._id;
  });

  console.log(filteredUsers);

  //WIP
  const filterUsersList = (e) => {
    setQuery(e.target.value);

    if (e.target.value === "") {
      setFoundUsers([]);
    }

    const newUsers = filteredUsers.filter((person) => {
      return person.username === query || person.username.includes(query);
    });

    setFoundUsers(newUsers);
  };

  return <div>FindFriends</div>;
};

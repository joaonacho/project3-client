import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(UserContext);

  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "nav-active" : "nav-inactive")}
        to="/projects"
      >
        Projects
      </NavLink>

      {!isLoggedIn && (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-inactive"
            }
            to="/signup"
          >
            Sign up
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-inactive"
            }
            to="/login"
          >
            Log in
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <div>Welcome {user && user.username}</div>
          <button onClick={logoutUser}>Logout</button>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-inactive"
            }
            to="/projects/add"
          >
            Add project
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-active" : "nav-inactive"
            }
            to={`/profile/${user.username}`}
          >
            Profile
          </NavLink>
        </>
      )}
    </nav>
  );
};

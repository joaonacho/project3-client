import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(UserContext);
  let location = useLocation();

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
          {location.pathname !== `/profile/${user.username}` &&
            location.pathname !== `/profile/${user.username}/edit` && (
              <div>
                <img
                  src={user.profileImg}
                  alt="profilepic"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
              </div>
            )}
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

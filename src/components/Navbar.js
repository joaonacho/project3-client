import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

import "./navbar.scss";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(UserContext);
  let location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="navbar-icons navbar-logo" to="/homepage">
          Logo
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
              to="/projects"
            >
              Feed
            </NavLink>

            <NavLink className="navbar-icons navbar-profile" to="/profile">
              My Profile
            </NavLink>

            <NavLink className="navbar-icons navbar-explore" to="/profile">
              Explore
            </NavLink>

            <NavLink className="navbar-icons navbar-findfriends" to="/profile">
              Find Friends
            </NavLink>

            {location.pathname !== `/profile/${user.username}` &&
              location.pathname !== `/profile/${user.username}/edit` && (
                <div>
                  <img
                    src={user.profileImg}
                    alt="profilepic"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            <button onClick={logoutUser}>Logout</button>

            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
              to={`/profile/${user.username}`}
            >
              My Profile
            </NavLink>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
              to="/login"
            >
              Log in
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
              to="/signup"
            >
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

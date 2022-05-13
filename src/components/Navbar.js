import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";

import { GiFilmStrip } from "react-icons/gi";
import "./navbar.scss";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(UserContext);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const LinksNavBar = ({ className }) => {
    return (
      <ul className={className}>
        <li>
          <NavLink
            className="navlink"
            onClick={() => setClick(false)}
            to="/explore"
          >
            <p>explore movies</p>
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/find-friends"
                onClick={() => setClick(false)}
                className="navlink"
              >
                <p>find friends</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/feed/${user.username}`}
                className="navlink"
                onClick={() => setClick(false)}
              >
                <p>feed</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/profile/${user.username}`}
                onClick={() => setClick(false)}
                className="navlink"
              >
                <p>profile</p>
              </NavLink>
            </li>
            <li className="navlink">
              <p className="arrange-font" onClick={logoutUser}>
                Logout
              </p>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/login"
                onClick={() => setClick(false)}
                className="navlink"
              >
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                onClick={() => setClick(false)}
                className="navlink"
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    );
  };

  return (
    <nav className="navbar bg-primary-clr-medium-dark">
      <div className="container">
        <NavLink className="navbar-icons navbar-logo navlink" to="/">
          <h1 className="text-white">
            <span>
              <GiFilmStrip style={{ fontSize: "1.8rem" }} />
              Movie
            </span>
            Screen
          </h1>
        </NavLink>

        <LinksNavBar className={"nav-menu"} />
        {click && <LinksNavBar className={"nav-menu active"} />}
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaRegTimesCircle className="icon" />
          ) : (
            <HiOutlineMenuAlt4 className="icon" />
          )}
        </div>
      </div>
    </nav>
  );
};

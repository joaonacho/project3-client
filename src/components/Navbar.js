import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import {
  RiUserSearchLine,
  RiUserLine,
  RiSearchLine,
  RiFileList3Line,
} from "react-icons/ri";
import { GiFilmSpool } from "react-icons/gi";
import "./navbar.scss";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(UserContext);
  let location = useLocation();

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
            <RiSearchLine style={{ fontSize: "1.3rem" }} />
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
                <RiUserSearchLine style={{ fontSize: "1.3rem" }} />
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/feed/${user.username}`}
                className="navlink"
                onClick={() => setClick(false)}
              >
                <RiFileList3Line style={{ fontSize: "1.3rem" }} />
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/profile/${user.username}`}
                onClick={() => setClick(false)}
                className="navlink"
              >
                <RiUserLine style={{ fontSize: "1.3rem" }} />
              </NavLink>
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
              <GiFilmSpool style={{ fontSize: "1.8rem" }} />
              Movie
            </span>
            Screen
          </h1>
        </NavLink>

        {isLoggedIn && <button onClick={logoutUser}>Logout</button>}
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

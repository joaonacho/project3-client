import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import "./navbar.scss";

export const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useContext(UserContext);
  let location = useLocation();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink
          className="navbar-icons navbar-logo"
          style={{ textDecoration: "none" }}
          to="/"
        >
          <h1>
            <span>
              <BsFillHouseFill />
              Movie
            </span>
            Screen
          </h1>
        </NavLink>

        {isLoggedIn && <button onClick={logoutUser}>Logout</button>}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <NavLink to="/explore" style={{ textDecoration: "none" }}>
              Explore
            </NavLink>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/feed" style={{ textDecoration: "none" }}>
                  Feed
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/profile/${user.username}`}
                  style={{ textDecoration: "none" }}
                >
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/projects" style={{ textDecoration: "none" }}>
                  Find Friends
                </NavLink>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" style={{ textDecoration: "none" }}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaRegTimesCircle className="icon" />
          ) : (
            <HiOutlineMenuAlt4 className="icon" />
          )}
        </div>
      </div>
    </nav>

    // <nav className="navbar">
    //   <div className="navbar-container">
    //     <NavLink className="navbar-icons navbar-logo" to="/homepage">
    //       <h1>
    //         <span>
    //           <BsFillHouseFill />
    //           Movie
    //         </span>
    //         Friends
    //       </h1>
    //     </NavLink>

    //     {isLoggedIn && (
    //       <>
    //         <NavLink
    //           className={({ isActive }) =>
    //             isActive ? "nav-active" : "nav-inactive"
    //           }
    //           to="/projects"
    //         >
    //           Feed
    //         </NavLink>

    //         <NavLink className="navbar-icons navbar-profile" to="/profile">
    //           My Profile
    //         </NavLink>

    //         <NavLink className="navbar-icons navbar-explore" to="/profile">
    //           Explore
    //         </NavLink>

    //         <NavLink className="navbar-icons navbar-findfriends" to="/profile">
    //           Find Friends
    //         </NavLink>

    //         {location.pathname !== `/profile/${user.username}` &&
    //           location.pathname !== `/profile/${user.username}/edit` && (
    //             <div>
    //               <img
    //                 src={user.profileImg}
    //                 alt="profilepic"
    //                 style={{
    //                   width: "80px",
    //                   height: "80px",
    //                   borderRadius: "50%",
    //                 }}
    //               />
    //             </div>
    //           )}
    //         <button onClick={logoutUser}>Logout</button>

    //         <NavLink
    //           className={({ isActive }) =>
    //             isActive ? "nav-active" : "nav-inactive"
    //           }
    //           to={`/profile/${user.username}`}
    //         >
    //           My Profile
    //         </NavLink>
    //       </>
    //     )}

    //     {!isLoggedIn && (
    //       <>
    //         <NavLink
    //           className={({ isActive }) =>
    //             isActive ? "nav-active" : "nav-inactive"
    //           }
    //           to="/login"
    //         >
    //           Log in
    //         </NavLink>
    //         <NavLink
    //           className={({ isActive }) =>
    //             isActive ? "nav-active" : "nav-inactive"
    //           }
    //           to="/signup"
    //         >
    //           Sign up
    //         </NavLink>
    //       </>
    //     )}
    //   </div>
    // </nav>
  );
};

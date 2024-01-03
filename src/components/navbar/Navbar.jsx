import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";

import { GiFilmStrip } from "react-icons/gi";
import Logo from "./modules/Logo";
import AuthButtons from "./modules/AuthButtons";
import Avatar from "./modules/Avatar";

export const Navbar = ({ filterMovieList, query }) => {
	const { isLoggedIn, user, logoutUser } = useContext(UserContext);

	return (
		<header id="header" className="navbar bg-base-300/80 w-full flex justify-between shadow-lg px-8 z-50">
			<Logo />
			<div className="form-control">
				<input
					type="text"
					placeholder="Search"
					onChange={filterMovieList}
					value={query}
					className="input bg-base-100 w-24 md:w-auto"
				/>
			</div>
			<div className=" gap-2">{isLoggedIn ? <Avatar user={user} logoutUser={logoutUser} /> : <AuthButtons />}</div>
		</header>
	);
};

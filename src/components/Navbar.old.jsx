import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaRegTimesCircle } from "react-icons/fa";

import { GiFilmStrip } from "react-icons/gi";

export const Navbar = () => {
	const { isLoggedIn, user, logoutUser, openUserMenu, handleOpenUserMenu } = useContext(UserContext);

	return (
		<header id="header" className="navbar bg-base-300/80 w-full shadow-lg px-8">
			<div className="flex-1">
				<NavLink to="/" className=" text-xl">
					MovieScreen
				</NavLink>
			</div>
			<div className="flex-none gap-2">
				{isLoggedIn ? (
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="avatar">
							<div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<img alt="Tailwind CSS Navbar component" src={`${user.profileImg}`} />
							</div>
						</div>
						<ul
							tabIndex={0}
							className="mt-6 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-300 flex gap-2 rounded-box w-52">
							<li>
								<NavLink
									to={`/profile/${user.username}`}
									className={({ isActive }) =>
										isActive ? "bg-accent-900 w-full" : ""
									}>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/feed/${user.username}`}
									className={({ isActive }) =>
										isActive ? "bg-accent-700 w-full" : ""
									}>
									Feed
								</NavLink>
							</li>
							<li>
								<div onClick={logoutUser}>Logout</div>
							</li>
						</ul>
					</div>
				) : (
					<div className="flex gap-2">
						<NavLink to="/login" className="btn btn-primary">
							Log In
						</NavLink>
						<NavLink to="/signup" className="btn btn-outline btn-primary">
							Sign Up
						</NavLink>
					</div>
				)}
			</div>
		</header>
	);
};

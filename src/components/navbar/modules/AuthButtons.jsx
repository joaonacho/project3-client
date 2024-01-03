import React from "react";
import { NavLink } from "react-router-dom";

const AuthButtons = () => {
	return (
		<div className="flex gap-2">
			<NavLink to="/login" className="btn btn-primary">
				Log In
			</NavLink>
			<NavLink to="/signup" className="btn btn-outline btn-primary">
				Sign Up
			</NavLink>
		</div>
	);
};

export default AuthButtons;

import { logIn } from "../api";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import "./Login.scss";

import React from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await logIn({ email, password });
    storeToken(response.data.authToken);
    authenticateUser();
    navigate(`/`);
  };

  return (
    <div id="loginform">
      <h1 id="headerTitle">Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            description="Email"
            placeholder="Enter your email"
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="row">
          <input
            description="Password"
            placeholder="Enter your password"
            type="password"
            required
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div id="button" className="row">
          <button type="submit">Log in</button>
        </div>
      </form>

      <p className="DontHaveAnAccount">
        Don't have an account?
        <Link className="a" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

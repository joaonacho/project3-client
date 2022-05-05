import { logIn } from "../api";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import "./Login.scss";

import React from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await logIn({ username, password });
    storeToken(response.data.authToken);
    authenticateUser();
    navigate(`/profile/${username}`);
  };
  const FormInput = (props) => (
    <div class="row">
      <label>{props.description}</label>
      <input type={props.type} placeholder={props.placeholder} />
    </div>
  );

  return (
    <div id="loginform">
      <h1 id="headerTitle">Log in</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          description="Username"
          placeholder="Enter your username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          description="Password"
          placeholder="Enter your password"
          type="password"
          required
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="button" class="row">
          <button type="submit"></button>
        </div>
      </form>

      <p className="DontHaveAnAccount">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

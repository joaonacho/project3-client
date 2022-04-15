import { signUp } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import React from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({ username, email, password });
    navigate("/");
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>password</label>
        <input
          type="password"
          required
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Sign up</button>
      </form>

      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

import { signUp, upload } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import "./Signup.scss";

import React from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [genres, setGenres] = useState([]);
  const [image, setImage] = useState();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { value: "Horror", label: "Horror" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animation", label: "Animation" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "History", label: "History" },
    { value: "Music", label: "Music" },
    { value: "Mistery", label: "Mistery" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western" },
  ];

  const handleGenres = (e) => {
    setGenres(e.map((x) => x.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let profileImg;

    if (image) {
      const uploadData = new FormData();

      uploadData.append("file", image);
      const response = await upload(uploadData);
      profileImg = response.data.fileUrl;
    }

    try {
      setMessage(null);
      const accountCreated = await signUp({
        username,
        email,
        password,
        genres,
        country,
        profileImg,
      });
      setIsLoading(false);
      toast.success("A new account was created! Please log in.");
      navigate("/login");
      console.log(accountCreated);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div id="SignUpForm">
      {isLoading && (
        <div
          style={{
            height: "600px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: "0.8",
          }}
        >
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
        </div>
      )}
      <h1 id="headerTitle">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            description="Username"
            placeholder="Enter your username"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="row">
          <input
            description="Email"
            placeholder="Enter your email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="row">
          <input
            description="Country"
            placeholder="Enter your Country"
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="row">
          <input
            description="Password"
            placeholder="Enter your Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row">
          <label labelFor="image">Profile picture:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="row">
          <label style={{ textAlign: "center" }}>Movie genres:</label>
          <Select
            id="options"
            options={options}
            isMulti
            styles={customStyles}
            name="genres"
            placeholder="Select your favourite movie genres"
            value={options.filter((obj) => genres.includes(obj.value))}
            onChange={handleGenres}
          />
        </div>

        <div id="button" className="row">
          <button type="submit">Sign up</button>
        </div>
      </form>

      {message && (
        <p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>
          {message}
        </p>
      )}

      <p className="DontHaveAnAccount">
        Don't have an account?
        <Link className="a" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

const customStyles = {
  menu: () => ({
    width: "100%",
    backgroundColor: "hsl(266, 92%, 95%, 100)",
    color: "black",
  }),

  control: () => ({
    width: "100%",
    padding: "2rem",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    maxWidth: "240px",
    minWidth: "240px",
  }),

  valueContainer: () => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
  }),
  input: () => ({
    display: "none",
  }),
  multiValueLabel: () => ({
    background: "hsl(265, 100%, 86%)",
    color: "black",
    padding: ".2rem",
  }),
  multiValueRemove: () => ({
    background: "rgba(48, 129, 237, 0.8) 50%",
    padding: ".2rem",
  }),
};

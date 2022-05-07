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
  const navigate = useNavigate();

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
    let profileImg;

    if (image) {
      const uploadData = new FormData();

      uploadData.append("file", image);
      const response = await upload(uploadData);
      profileImg = response.data.fileUrl;
    }

    await signUp({
      username,
      email,
      password,
      genres,
      country,
      profileImg,
    });
    toast.success("A new account was created! Please log in.");
    navigate("/login");
  };

  return (
    // <div className="signup-box container">
    //   <h1>Sign up</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>Username</label>
    //     <input
    //       type="text"
    //       required
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />

    //     <label>Email</label>
    //     <input
    //       type="email"
    //       required
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />

    //     <label>Country</label>
    //     <input
    //       type="text"
    //       value={country}
    //       onChange={(e) => setCountry(e.target.value)}
    //     />

    //     <label>Password</label>
    //     <input
    //       type="password"
    //       required
    //       minLength="6"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />

    //     <label labelFor="image">Profile picture:</label>
    //     <input type="file" onChange={(e) => setImage(e.target.files[0])} />

    //     <label>Movie genres:</label>
    //     <Select
    //       id="options"
    //       options={options}
    //       isMulti
    //       name="genres"
    //       className="basic-multi-select"
    //       classNamePrefix="select"
    //       placeholder="Select your favourite movie genres"
    //       value={options.filter((obj) => genres.includes(obj.value))}
    //       onChange={handleGenres}
    //     />

    //     <button type="submit">Sign up</button>
    //   </form>

    //   <p>Already have an account?</p>
    //   <Link to="/login">Login</Link>
    // </div>
    <div id="SignUpForm">
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
            description="Password"
            placeholder="Enter your email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <label>Email</label>
         <input
           type="email"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         /> */}

        <div id="button" className="row">
          <button type="submit">Log in</button>
        </div>
      </form>

      <p className="DontHaveAnAccount">
        Don't have an account?{" "}
        <Link className="a" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

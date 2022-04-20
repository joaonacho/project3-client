import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser, upload } from "../api";
import Select from "react-select";
import { toast } from "react-toastify";

export const EditUser = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const foundUser = await getUser(username);
      setUser(foundUser.data);
      setGenres(foundUser.data.genres);
      setCountry(foundUser.data.country);
      setAbout(foundUser.data.about);
      setImage(foundUser.data.profileImg);
    })();
  }, [username]);

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

    if (newImage) {
      const uploadData = new FormData();
      uploadData.append("file", newImage);
      const response = await upload(uploadData);
      profileImg = response.data.fileUrl;
    } else {
      profileImg = image;
    }

    await updateUser(username, {
      genres,
      country,
      about,
      profileImg,
    });
    toast.success("User saved");
    navigate(`/profile/${username}`);
  };

  return (
    <div>
      {user && (
        <>
          <img
            src={user.profileImg}
            alt="profilepicture"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
          <h2>{user.username}</h2>
          <form onSubmit={handleSubmit}>
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <label>About me:</label>
            <textarea
              cols="30"
              rows="5"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>

            <label labelFor="image">Profile picture:</label>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
            />

            <label>Movie genres:</label>
            <Select
              id="options"
              options={options}
              isMulti
              name="genres"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select your favourite genres"
              value={options.filter((obj) => genres.includes(obj.value))}
              onChange={handleGenres}
            />

            <button type="submit">Save changes</button>
          </form>
        </>
      )}
    </div>
  );
};

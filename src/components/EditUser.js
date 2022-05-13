import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser, upload } from "../api";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import "./EditUser.scss";
import { Link } from "react-router-dom";

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
    <section className="container">
      <div className="center">
        <div className="SignUpForm">
          {user && (
            <>
              <div className="edit-profile-group">
                <img
                  src={user.profileImg}
                  alt="profilepicture"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
                <h2 className="text-secondary-clr-medium-light fs-800 ff-sans-cond">
                  {user.username}
                </h2>
              </div>
              <div className="row">
                <label>Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="row">
                <label>About me:</label>
                <textarea
                  cols="30"
                  rows="5"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>
              <div className="row">
                <label labelfor="image">Profile picture:</label>
                <input
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
              </div>
              <div className="row">
                <Select
                  id="options"
                  styles={customStyles}
                  options={options}
                  isMulti
                  name="genres"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select your favourite genres"
                  value={options.filter((obj) => genres.includes(obj.value))}
                  onChange={handleGenres}
                />
              </div>

              <FaCheck
                style={{
                  fontSize: "2rem",
                  color: "lightgreen",
                  marginLeft: "10px",
                }}
                onClick={handleSubmit}
              />
            </>
          )}
        </div>
        <Link
          to={`/profile/${username}`}
          style={{
            textDecoration: "none",
            color: "grey",
            marginTop: "30px",
          }}
        >
          <p>Go back</p>
        </Link>
      </div>
    </section>
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

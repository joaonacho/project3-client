import React, { useState, useEffect } from "react";
import { getAllProjects } from "../api";
import { Link } from "react-router-dom";
import axios from "axios";

export const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllProjects();
      setProjects(response.data);
    })();
  }, []);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1`
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    })();
  }, []);

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1"
      );
      setPopular(response.data.results);
    })();
  }, []);

  return (
    <div>
      <ul>
        {projects.map((project) => {
          return (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>{project.title}</Link>
            </li>
          );
        })}
      </ul>

      {movies &&
        movies.map((movie) => {
          return (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt="poster"
              />
              <h3>{movie.title}</h3>
              <p>Release date: {movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          );
        })}

      {/* {popular &&
        popular.map((pop) => {
          return (
            <div key={pop.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${pop.poster_path}`}
                alt="poster"
              />
              <h3>{pop.title}</h3>
              <p>Rating: {pop.vote_average}</p>
              <p>Release date: {pop.release_date}</p>
            </div>
          );
        })} */}
    </div>
  );
};

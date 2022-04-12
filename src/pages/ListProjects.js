import React, { useState, useEffect } from "react";
import {
  getAllProjects,
  getUpcomingMovies,
  getMovieDetails,
  getSimilarMovies,
} from "../api";
import { Link } from "react-router-dom";

export const ListProjects = () => {
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await getAllProjects();
  //     setProjects(response.data);
  //   })();
  // }, []);

  //GET List of Upcoming movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getUpcomingMovies();
      setMovies(response.data.results);
      // console.log(response.data.results);
    })();
  }, []);

  //GET One Movie by ID
  const [oneMovie, setOneMovie] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getMovieDetails(675353);
      setOneMovie(response.data);
      // console.log(response.data);
    })();
  }, []);

  //GET Similar movies
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getSimilarMovies(675353);
      setSimilarMovies(response.data.results);
      console.log(response.data.results);
    })();
  }, []);

  return (
    <div>
      {/* <ul>
        {projects.map((project) => {
          return (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>{project.title}</Link>
            </li>
          );
        })}
      </ul> */}

      {/* {oneMovie && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${oneMovie.poster_path}`}
            alt="poster"
          />
        </div>
      )} */}

      {similarMovies &&
        similarMovies.map((movie) => {
          return (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt="poster"
              />
              <h3>{movie.title}</h3>
              <p>Release date: {movie.release_date}</p>
              {/* <p>{movie.overview}</p> */}
            </div>
          );
        })}

      {/* {movies &&
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
        })} */}

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

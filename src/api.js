import axios from "axios";
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

export const getAllMovies = () => {
  return axios.get(`${baseURL}/movies`);
};

export const getProject = (id) => {
  return axios.get(`${baseURL}/projects/${id}`);
};

export const deleteProject = (id) => {
  return axios.delete(`${baseURL}/projects/${id}`);
};

export const addProject = (project) => {
  return axios.post(`${baseURL}/projects`, project);
};

export const updateProject = (updatedProject) => {
  return axios.put(`${baseURL}/projects/${updatedProject._id}`, updatedProject);
};

export const signUp = (user) => {
  return axios.post(`${baseURL}/signup`, user);
};

export const logIn = (user) => {
  return axios.post(`${baseURL}/login`, user);
};

export const verify = (storedToken) => {
  return axios.get(`${baseURL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
};

export const upload = (uploadData) => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

//MOVIE API
export const getUpcomingMovies = () => {
  return axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1"
  );
};

export const getMovieDetails = (id) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US`
  );
};

export const getSimilarMovies = (id) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1`
  );
};

export const getInTheatres = () => {
  return axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1&region=PT"
  );
};

export const getPopularMovies = () => {
  return axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1&region=PT"
  );
};

export const getTopRated = () => {
  return axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&page=1&region=PT"
  );
};

export const searchMovie = (movie) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US&query=${movie}&page=1&include_adult=false`
  );
};

export const trendingWeekMovies = () => {
  return axios.get(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=d8030aaaaf0512a8717930690f78c10b"
  );
};

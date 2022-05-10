import axios from "axios";
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

//Movies
export const verify = (storedToken) => {
  return axios.get(`${baseURL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
};

export const upload = (uploadData) => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

//GET movie reviews
export const getMovieReviews = (movieId) => {
  return axios.get(`${baseURL}/reviews/${movieId}`);
};

//MOVIE external API
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

export const getMovieCredits = (id) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d8030aaaaf0512a8717930690f78c10b&language=en-US`
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

//User
//GET user info
export const getUser = (username) => {
  return axios.get(`${baseURL}/profile/${username}`);
};

//PUT edit user info
export const updateUser = (username, user) => {
  return axios.put(`${baseURL}/profile/${username}/edit`, user);
};

//POST signup
export const signUp = (user) => {
  return axios.post(`${baseURL}/signup`, user);
};

//POST login
export const logIn = (user) => {
  return axios.post(`${baseURL}/login`, user);
};

//GET random 6 users
export const randomSix = () => {
  return axios.get(`${baseURL}/random-users`);
};

//PUT add movie to favourites
export const addToFavourites = (movie) => {
  return axios.put(`${baseURL}/movies/add`, movie, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

//PUT remove movie from favourites
export const removeFromFavourites = (movieId, user) => {
  return axios.put(`${baseURL}/movies/${movieId}/remove`, user, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

//GET search users
export const searchUsers = (query) => {
  return axios.get(`${baseURL}/search-users/${query}`);
};

//PUT follow users
export const followUser = (username, user) => {
  return axios.put(`${baseURL}/profile/${username}/follow`, user, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

//PUT unfollow users
export const unfollowUser = (username, user) => {
  return axios.put(`${baseURL}/profile/${username}/unfollow`, user, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

//GET users match genres
export const getUsersGenres = (username) => {
  return axios.get(`${baseURL}/similar-genres/${username}`);
};

//REVIEWS
//POST create a movie review
export const movieReview = (movieId, review) => {
  return axios.post(`${baseURL}/movies/${movieId}/review`, review, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

//GET reviews from user
export const getUserReviews = (username) => {
  return axios.get(`${baseURL}/profile/${username}/reviews`);
};

//PUT edit review
export const editReview = (reviewId, movie) => {
  return axios.put(`${baseURL}/${reviewId}/edit`, movie, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

//DELETE review
export const deleteReview = (reviewId) => {
  return axios.delete(`${baseURL}/${reviewId}/delete`);
};

//GET random 3 reviews
export const randomReviews = () => {
  return axios.get(`${baseURL}/random-reviews`);
};

//Feed
//GET user's posts
export const getFeed = (username) => {
  return axios.get(`${baseURL}/feed/${username}`);
};

//POST create posts
export const createPost = (post) => {
  return axios.post(`${baseURL}/create-post`, post);
};

//DELETE delete posts
export const deletePost = (postId) => {
  return axios.delete(`${baseURL}/delete/${postId}`);
};

//COMMENTS
//POST create comment
export const createComment = (postId, comment) => {
  return axios.post(`${baseURL}/comment/${postId}`, { comment });
};

//GET comments in post
export const getComments = (postId) => {
  return axios.get(`${baseURL}/comment/${postId}`);
};

//PUT like a post
export const likePost = (postId, userId) => {
  return axios.put(`${baseURL}/like/${postId}`, { userId });
};

//PUT dislike a post
export const dislikePost = (postId, userId) => {
  return axios.put(`${baseURL}/dislike/${postId}`, { userId });
};

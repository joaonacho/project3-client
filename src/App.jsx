import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/navbar/Navbar";
// auth
import { Signup } from "./pages/auth/Signup";
import { Login } from "./pages/auth/Login";
import { IsPrivate } from "./components/IsPrivate";
// user
import { Profile } from "./pages/user/Profile";
import { EditUser } from "./pages/user/EditUser";
import { UserReviews } from "./pages/user/UserReviews";
import { UserFollowers } from "./pages/user/UserFollowers";
import { UserFollowing } from "./pages/user/UserFollowing";
// movie
import { MovieDetails } from "./pages/movie/MovieDetails";
// feed
import { searchMovie } from "./api";
import { FindFriends } from "./pages/feed/FindFriends";
import { Feed } from "./pages/feed/Feed";
import { CreatePost } from "./components/CreatePost";
import { Post } from "./components/Post";
// landing
import { LandingPage } from "./pages/LandingPage";
import Footer from "./components/Footer";
import MovieSearchModal from "./components/MovieSearchModal";

function App() {
	const [searchedMovies, setSearchedMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoadingSearch, setIsLoadingSearch] = useState(false);

	const filterMovieList = (e) => {
		setSearchQuery(e.target.value);

		if (e.target.value === "") {
			setSearchedMovies([]);
		}
		setIsLoadingSearch(true);

		setTimeout(() => {
			(async () => {
				let movieFound = await searchMovie(e.target.value);
				setSearchedMovies(movieFound.data.results);
				setIsLoadingSearch(false);
			})();
		}, 1500);
	};

	const cleanUp = () => {
		setSearchedMovies([]);
		setSearchQuery("");
	};
	return (
		<div className={`relative  text-base-content ${searchQuery ? "overflow-hidden h-screen" : ""}`}>
			<div className="w-screen min-h-screen fixed flex justify-center pt-32 px-6 pb-40 pointer-events-none">
				<div className="gradient"></div>{" "}
			</div>
			<Navbar filterMovieList={filterMovieList} query={searchQuery} />
			<main className={` relative  w-full flex flex-col items-center justify-center align-middle`}>
				{searchQuery && (
					<MovieSearchModal movie={searchedMovies} cleanUp={cleanUp} isLoadingSearch={isLoadingSearch} />
				)}

				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/find-friends" element={<FindFriends />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/feed/:username"
						element={
							<Feed>
								<CreatePost />
								<Post />
							</Feed>
						}
					/>
					<Route path="/profile/:username" element={<Profile />} />
					<Route path="/:username/followers" element={<UserFollowers />} />
					<Route path="/:username/following" element={<UserFollowing />} />
					<Route
						path="/profile/:username/edit"
						element={
							<IsPrivate>
								<EditUser />
							</IsPrivate>
						}
					/>
					<Route path="/profile/:username/reviews" element={<UserReviews />} />
					<Route path="/movies/:movieId" element={<MovieDetails />} />
				</Routes>
			</main>
			<Footer />

			<ToastContainer />
		</div>
	);
}

export default App;

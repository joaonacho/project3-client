import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar";
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
import { SearchMovie } from "./components/SearchMovie";
import { Explore } from "./pages/feed/Explore";
import { FindFriends } from "./pages/feed/FindFriends";
import { Feed } from "./pages/feed/Feed";
import { CreatePost } from "./components/CreatePost";
import { Post } from "./components/Post";
// landing
import { Carousel } from "./components/Carousel";
import { LandingPage } from "./pages/LandingPage";

function App() {
	return (
		<div className="relative  text-base-content ">
			<div className="w-screen min-h-screen fixed flex justify-center pt-32 px-6 pb-40 pointer-events-none">
				<div className="gradient"></div>{" "}
			</div>
			<Navbar />
			<main className="relative z-10 w-full flex flex-col items-center justify-center align-middle">
				<Routes>
					<Route
						path="/"
						element={
							<LandingPage>
								<Carousel />
							</LandingPage>
						}
					/>
					<Route
						path="/explore"
						element={
							<Explore>
								<SearchMovie />
								<Carousel />
							</Explore>
						}
					/>
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

			<ToastContainer />
		</div>
	);
}

export default App;

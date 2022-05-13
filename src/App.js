import "./App.scss";
import { LandingPage } from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { IsPrivate } from "./components/IsPrivate";
import { Profile } from "./pages/Profile";
import { EditUser } from "./components/EditUser";
import { MovieDetails } from "./pages/MovieDetails";
import { UserReviews } from "./pages/UserReviews";
import { Carousel } from "./components/Carousel";
import { SearchMovie } from "./components/SearchMovie";
import { Explore } from "./pages/Explore";
import { FindFriends } from "./pages/FindFriends";
import { Feed } from "./pages/Feed";
import { CreatePost } from "./components/CreatePost";
import { Post } from "./components/Post";
import { UserFollowers } from "./pages/UserFollowers";
import { UserFollowing } from "./pages/UserFollowing";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />

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
    </div>
  );
}

export default App;

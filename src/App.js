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
import { SearchMovie } from "./components/SearchMovie";
import { MovieDetails } from "./pages/MovieDetails";
import { UserReviews } from "./pages/UserReviews";
import { Children } from "react";
import { Carousel } from "./components/Carousel";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <SearchMovie />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage>
              <Carousel />
            </LandingPage>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
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

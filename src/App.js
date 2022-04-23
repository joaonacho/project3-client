import "./App.css";
import { ListProjects } from "./pages/ListProjects";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AddProject } from "./pages/AddProject";
import { ProjectDetail } from "./pages/ProjectDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditProject } from "./pages/EditProject";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { IsPrivate } from "./components/IsPrivate";
import { Profile } from "./pages/Profile";
import { EditUser } from "./components/EditUser";
import { SearchMovie } from "./components/SearchMovie";
import { MovieDetails } from "./pages/MovieDetails";
import { ReviewMovie } from "./pages/ReviewMovie";
import { Children } from "react";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <SearchMovie />
      <Routes>
        <Route path="/" element={<ListProjects />} />
        <Route path="/projects" element={<ListProjects />} />
        <Route
          path="/projects/add"
          element={
            <IsPrivate>
              <AddProject />
            </IsPrivate>
          }
        />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/projects/:projectId/edit" element={<EditProject />} />
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
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;

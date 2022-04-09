import React, { useState, useEffect } from "react";
import { getAllProjects } from "../api";
import { Link } from "react-router-dom";

export const ListProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllProjects();
      setProjects(response.data);
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
    </div>
  );
};

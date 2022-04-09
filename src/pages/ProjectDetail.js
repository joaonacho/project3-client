import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProject, deleteProject } from "../api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const ProjectDetail = () => {
  const navigate = useNavigate();

  const [project, setProject] = useState();
  const { projectId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getProject(projectId);
      setProject(response.data);
    })();
  }, [projectId]);

  const handleDelete = async (id) => {
    await deleteProject(id);
    toast.warning("Project deleted!");
    navigate("/");
  };

  return (
    <div>
      {project ? (
        <div>
          <h1>{project.title}</h1> <h3>{project.description}</h3>
          {project.imageUrl && <img src={project.imageUrl} alt="project" />}
          <button onClick={() => handleDelete(project._id)}>Delete</button>
          <button onClick={() => navigate(`/projects/${project._id}/edit`)}>
            Edit
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

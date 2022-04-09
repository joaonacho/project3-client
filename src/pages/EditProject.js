import React from "react";
import { getProject, updateProject } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const EditProject = () => {
  const [project, setProject] = useState({ title: "", description: "" });
  const { projectId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getProject(projectId);
      setProject(response.data);
    })();
  }, [projectId]);

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    //call de API
    await updateProject(project);
    //redirect the user
    toast.success("Project saved!");
    navigate(`/projects/${project._id}`);
  };

  return (
    <>
      {project && (
        <form onSubmit={handleUpdateProject}>
          <label labelFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />

          <label labelFor="description">Decription</label>
          <input
            id="description"
            type="text"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />

          <button type="submit">Update project</button>
        </form>
      )}
    </>
  );
};

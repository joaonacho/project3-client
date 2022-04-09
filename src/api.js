import axios from "axios";
const baseURL = `${process.env.REACT_APP_PROJECTS_API}/api`;

export const getAllProjects = () => {
  return axios.get(`${baseURL}/projects`);
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

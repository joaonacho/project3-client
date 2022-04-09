import { useState } from "react";
import { useNavigate } from "react-router";
import { addProject, upload } from "../api";
import { toast } from "react-toastify";

export const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  let navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("file", image);

    const response = await upload(uploadData);
    // console.log("response from upload", response.data);

    await addProject({ title, description, imageUrl: response.data.fileUrl });
    toast.success("Project created!");
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label labelFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label labelFor="description">Decription</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label labelFor="image">Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Create Project</button>
      </form>
    </>
  );
};

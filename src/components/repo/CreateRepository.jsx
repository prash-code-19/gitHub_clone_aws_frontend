import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./createRepository.css";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const owner = localStorage.getItem("userId");

    if (!owner) {
      navigate("/auth");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:3002/repo/create", {
        name,
        description,
        visibility,
        owner,
      });
      navigate("/");
    } catch (requestError) {
      console.error("Error creating repository:", requestError);
      setError(
        requestError.response?.data?.error ||
          requestError.response?.data?.message ||
          "Could not create repository. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="create-repository">
        <h1>Create a repository</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="repository-name">Repository name</label>
          <input
            id="repository-name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="repository-description">Description</label>
          <textarea
            id="repository-description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <label className="repository-visibility">
            <input
              type="checkbox"
              checked={visibility}
              onChange={(event) => setVisibility(event.target.checked)}
            />
            Public repository
          </label>

          {error && <p role="alert">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create repository"}
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateRepository;

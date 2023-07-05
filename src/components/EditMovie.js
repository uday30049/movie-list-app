import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editedMovie, setEditedMovie] = useState({
    title: "",
    genre: "",
  });

  const movieToEdit = props.movies.find((movie) => movie.id === id);

  useState(() => {
    if (movieToEdit) {
      setEditedMovie({
        title: movieToEdit.title,
        genre: movieToEdit.genre,
      });
    }
  }, [movieToEdit]);

  const handleTitleChange = (e) => {
    setEditedMovie((prevMovie) => ({
      ...prevMovie,
      title: e.target.value,
    }));
  };

  const handleGenreChange = (e) => {
    setEditedMovie((prevMovie) => ({
      ...prevMovie,
      genre: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedMovie.title === "" || editedMovie.genre === "") {
      alert("All the fields are mandatory!");
      return;
    }

    props.editMovieHandler({
      id,
      title: editedMovie.title,
      genre: editedMovie.genre,
    });

    setEditedMovie({ title: "", genre: "" });
    navigate("/");

    // Redirect to the movie detail page or any other desired page
  };

  return (
    <div className="edit-form">
      <h2>Edit Movie</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editedMovie.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={editedMovie.genre}
            onChange={handleGenreChange}
          />
        </div>
        <button className="ui button blue">Save</button>
      </form>
    </div>
  );
};

export default EditMovie;

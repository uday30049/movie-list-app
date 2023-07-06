import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = (props) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
  });

  const handleTitleChange = (e) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      title: e.target.value,
    }));
  };

  const handleGenreChange = (e) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      genre: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (movie.title === "" || movie.genre === "") {
      alert("All the fields are mandatory!");
      return;
    }

    props.addMovieHandler(movie);
    setMovie({ title: "", genre: "" });
    navigate("/");

    // Redirect to the movie list or any other desired page
  };

  return (
    <div className="ui main"><br/><br/>
      <h2>Add Movie</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={movie.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={movie.genre}
            onChange={handleGenreChange}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddMovie;

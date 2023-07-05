import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editedMovie, setEditedMovie] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteMovieHandler = (id) => {
    props.getMovieId(id);
  };

  const editMovieHandler = (id) => {
    const movieToEdit = props.movies.find((movie) => movie.id === id);
    setEditedMovie(movieToEdit);
  };

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

    props.editMovieHandler(editedMovie); // Pass the edited movie to the parent component

    // Reset the form and editedMovie state
    setEditedMovie(null);
  };

  const filteredMovies = props.movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderMovieList = filteredMovies.map((movie) => {
    return (
      <MovieCard
        movie={movie}
        clickHandler={deleteMovieHandler}
        editMovieHandler={editMovieHandler}
        key={movie.id}
      />
    );
  });

  return (
    <div className="main"><br/><br/><br/>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <h2>Movies List</h2>
      <div className="ui celled list">{renderMovieList}</div>
      <Link to="/add">
        <button className="ui button blue">Add Movie</button>
      </Link>
      {editedMovie && (
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
      )}
    </div>
  );
};

export default MovieList;

import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import EditMovie from "./EditMovie";

function App() {
  const LOCAL_STORAGE_KEY = "movies";
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addMovieHandler = (movie) => {
    setMovies([...movies, { id: uuid(), ...movie }]);
  };

  const removeMovieHandler = (id) => {
    const newMovieList = movies.filter((movie) => movie.id !== id);
    setMovies(newMovieList);
  };

  const editMovieHandler = (editedMovie) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === editedMovie.id) {
        return { ...movie, title: editedMovie.title, genre: editedMovie.genre };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<MovieList movies={movies} getMovieId={removeMovieHandler} editMovieHandler={editMovieHandler} />}
          />
          <Route
            path="/add"
            element={<AddMovie addMovieHandler={addMovieHandler} />}
          />
          <Route
            path="/movie/:id"
            element={<MovieDetail movies={movies} />}
          />
          <Route
            path="/edit/:id"
            element={<EditMovie movies={movies} editMovieHandler={editMovieHandler} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

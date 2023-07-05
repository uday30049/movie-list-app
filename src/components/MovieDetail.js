import React from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetail = (props) => {
  const { id } = useParams();
  const movie = props.movies.find((movie) => movie.id === id);

  if (!movie) {
    return <div>Movie not found.</div>; // You can handle the case when the movie is not found
  }

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="content"><br/><br/><br/>
          <div className="header">{movie.title}</div>
          <div className="meta">Genre: {movie.genre}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">Back to Movie List</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieDetail;

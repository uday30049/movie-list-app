import React from "react";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { id, title, genre } = props.movie || {};

  return (
    <div className="item">
      <div className="content">
        <Link to={`/movie/${id}`}>
          <div className="header"><h3>{title}</h3></div>
          <div>{genre}</div>
        </Link>
        <i
          className="trash icon"
          style={{ color: "red", marginTop: "7px" }}
          onClick={() => props.clickHandler(id)}
        ></i>
      </div>
      <Link to={`/edit/${id}`}>
        <i
          className="edit icon"
          style={{ color: "blue", marginTop: "7px" }}
          onClick={() => props.editMovieHandler(id)}
        ></i>
      </Link>
    </div>
  );
};

export default MovieCard;

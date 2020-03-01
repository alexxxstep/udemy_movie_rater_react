import React from "react";

const MovieList = (props) => {
  

  return (
    <div>
      {props.movies.map(movie => {
        return (
        <h3 key={movie.id}>{movie.title}</h3>
        )
      })}
    </div>   
  );
};

export default MovieList;

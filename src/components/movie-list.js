import React from "react";
var FontAwesome = require("react-fontawesome");

const MovieList = props => {
  const movieClicked = movie => evt => {
    props.movieClicked(movie);
  };

  const editClicked = movie => {
    props.editClicked(movie);
  };

  const removeClicked = movie => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${props.token}`
      }
    })
      .then(resp => props.movieDeleted(movie))
      .catch(error => console.log(error));
  };

  // const getDetails = (movie) => {
  //   fetch(
  //     `${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Token 26879ac5012d8777d187b74a5f4a5ea6986cee24"
  //       }
  //     }
  //   )
  //     .then(resp => resp.json())
  //     .then(res => props.editClicked(res))
  //     .catch(error => console.log(error));
  // };

  const newMovie = () => {
    props.newMovie();
  };

  return (
    <div>
      {props.movies.map(movie => {
        return (
          <div key={movie.id} className="movie-item">
            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
            <FontAwesome name="edit" onClick={() => editClicked(movie)} />
            <FontAwesome name="trash" onClick={() => removeClicked(movie)} />
          </div>
        );
      })}
      <button onClick={newMovie}>Add new</button>
    </div>
  );
};

export default MovieList;

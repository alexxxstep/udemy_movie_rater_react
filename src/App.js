import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";

class App extends Component {
  movies = ["titanic", "avatar"];

  state = {
    movies: [],
    selectedMovie: null
  };

  componentDidMount() {
    //fetch data
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        Authorization: "Token 26879ac5012d8777d187b74a5f4a5ea6986cee24"
      }
    })
      .then(resp => resp.json())
      .then(res => this.setState({ movies: res }))
      .catch(error => console.log(error));
  }

  movieClicked = movie => {
    this.setState({ selectedMovie: movie });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Rater</h1>
          <div className="layout">
            <MovieList
              movies={this.state.movies}
              movieClicked={this.movieClicked}
            />
            <MovieDetails movie={this.state.selectedMovie} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;

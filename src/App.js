import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null
  };

  componentDidMount() {
    //fetch data
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "GET",
      headers: {
        Authorization: "Token 26879ac5012d8777d187b74a5f4a5ea6986cee24"
      }
    })
      .then(resp => resp.json())
      .then(res => this.setState({ movies: res }))
      .catch(error => console.log(error));
  }

  loadMovie = movie => {
    this.setState({ selectedMovie: movie, editedMovie: null });
  };

  editClicked = selMovie => {
    this.setState({ editedMovie: selMovie });
  };

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({ movies: movies, selectedMovie: null });
  };

  newMovie = () => {
    this.setState({
      editedMovie: {
        title: "",
        description: ""
      }
    });
  };

  cancelForm = () => {
    this.setState({
      editedMovie: null
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Rater</h1>
          <div className="layout">
            <MovieList
              movies={this.state.movies}
              movieClicked={this.loadMovie}
              movieDeleted={this.movieDeleted}
              editClicked={this.editClicked}
              newMovie={this.newMovie}
            />
            <div>
              {!this.state.editedMovie ? (
                <MovieDetails
                  movie={this.state.selectedMovie}
                  updateMovie={this.loadMovie}
                />
              ) : (
                <MovieForm
                  movie={this.state.editedMovie}
                  cancelForm={this.cancelForm}
                />
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

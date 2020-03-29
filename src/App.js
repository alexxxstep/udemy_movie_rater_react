import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";
import { withCookies } from "react-cookie";

var FontAwesome = require("react-fontawesome");

class App extends Component {
  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get("mr-token")
  };

  componentDidMount() {
    //fetch data

    if (this.state.token) {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: "GET",
        headers: {
          Authorization:`Token ${this.state.token}` 
        }
      })
        .then(resp => resp.json())
        .then(res => this.setState({ movies: res }))
        .catch(error => console.log(error));
    } else {
      window.location.href = "/";
    }
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

  addMovie = movie => {
    this.setState({
      movies: [...this.state.movies, movie]
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <FontAwesome name="film" />
            <span>Movie Rater</span>
          </h1>
          <div className="layout">
            <MovieList
              movies={this.state.movies}
              movieClicked={this.loadMovie}
              movieDeleted={this.movieDeleted}
              editClicked={this.editClicked}
              newMovie={this.newMovie}
              token={this.state.token}
            />
            <div>
              {!this.state.editedMovie ? (
                <MovieDetails
                  movie={this.state.selectedMovie}
                  updateMovie={this.loadMovie}
                  token={this.state.token}

                />
              ) : (
                <MovieForm
                  movie={this.state.editedMovie}
                  cancelForm={this.cancelForm}
                  newMovie={this.addMovie}
                  editedMovie={this.loadMovie}
                  token={this.state.token}

                />
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withCookies(App);

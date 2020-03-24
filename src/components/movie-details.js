import React, { Component } from "react";
var FontAwesome = require("react-fontawesome");

export default class MovieDetails extends Component {
  state = {
    highlighted: -1
  };

  hightlightRate = high => evt => {
    this.setState({ highlighted: high });
  };

  rateClick = stars => evt => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 26879ac5012d8777d187b74a5f4a5ea6986cee24"
        },
        body: JSON.stringify({ stars: stars + 1 })
      }
    )
      .then(resp => resp.json())
      .then(res => this.getDetails())
      .catch(error => console.log(error));
  };

  getDetails = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 26879ac5012d8777d187b74a5f4a5ea6986cee24"
        }
      }
    )
      .then(resp => resp.json())
      .then(res => this.props.updateMovie(res))
      .catch(error => console.log(error));
  };

  render() {
    const mov = this.props.movie;

    // console.log(mov);
    return (
      <React.Fragment>
        {mov ? (
          <div>
            <h3>{mov.title}</h3>
            <FontAwesome
              name="star"
              className={mov.avr_rating > 0 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avr_rating > 1 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avr_rating > 2 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avr_rating > 3 ? "orange" : ""}
            />
            <FontAwesome
              name="star"
              className={mov.avr_rating > 4 ? "orange" : ""}
            />
            ({mov.no_of_ratings})<p>{mov.description}</p>
            <div className="rate-container">
              <h2>Rate it!!!</h2>
              {[...Array(5)].map((e, i) => {
                return (
                  <FontAwesome
                    key={i}
                    name="star"
                    className={this.state.highlighted > i - 1 ? "purple" : ""}
                    onMouseEnter={this.hightlightRate(i)}
                    onMouseLeave={this.hightlightRate(-1)}
                    onClick={this.rateClick(i)}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

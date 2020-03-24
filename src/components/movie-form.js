import React, { Component } from "react";

export default class MovieForm extends Component {
  state = {};

  cancelClicked = () => {
    this.props.cancelForm();
  };

  inputChanged = () => {
    console.log("changed");
  };

  saveClicked = () => {
    console.log("save");
  };




  render() {
    // console.log(mov);
    const { movie } = this.props;

    return (
      <React.Fragment>
        <div>
          <span>Title</span>
          <br />
          <input type="text" value={movie.title} onChange={this.inputChanged} />
          <br />
          <span>Description</span>
          <br />
          <textarea value={movie.description} onChange={this.inputChanged} />
          <br />

          <button onClick={this.saveClicked}>Save</button>
          <button onClick={this.cancelClicked}>Cancel</button>
        </div>
      </React.Fragment>
    );
  }
}

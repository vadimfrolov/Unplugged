import React, { Component } from "react";

class Flashmob extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>Create a flashmob</h4>
          <input
            name="title"
            placeholder="Title"
          ></input>
          <input
            name="description"
            placeholder="Describe your idea"
          ></input>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default Flashmob;
import React, { Component } from "react";

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI = async () => {
    const res = await fetch("http://localhost:9000/testAPI");
    const json = await res.text();
    this.setState({ apiResponse: json });
  };

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default Api;

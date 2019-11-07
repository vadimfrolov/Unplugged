import React, { Component } from "react";

import Loader from "react-loader-spinner";

export default class Spinner extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh"
        }}
      >
        {" "}
        <Loader
          type="Ball-Triangle"
          color="#8b0000"
          height={100}
          width={100}
          // timeout={29000} //3 secs
        />{" "}
      </div>
    );
  }
}

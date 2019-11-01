import React from "react";
import "../Home.css";
import Api from "./Api";
import User from "./User";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Api />

        <User />
      </div>
    );
  }
}

export default Home;

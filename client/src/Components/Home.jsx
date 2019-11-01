import React from "react";
import "../Home.css";
import User from "./User";
// import Navbar from './Navbar';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <User />
      </div>
    );
  }
}

export default Home;

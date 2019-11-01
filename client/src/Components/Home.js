import React from "react";
import logo from "../react.svg";
import "../Home.css";
import Api from "./Api";
import User from "./User";
import Navbar from "./Navbar";




class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Api />


      </div>
    );
  }
}

export default Home;

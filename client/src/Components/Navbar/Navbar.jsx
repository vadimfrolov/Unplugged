import React, { Component } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  switchSearchBarAC,
  keepArtistNameAC
} from "../../Redux/artistReducer/artistActions";
import { setUserAC, logoutAC } from "../../Redux/UserAuth/actions/userAuth";
import {
  Button
} from "react-materialize";

import "./navbar.css";
import {Icon } from "react-materialize";

import Youtube from "../Youtube/Youtube";

class Navbar1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession = async () => {
    const response = await fetch("/users/getsession/");

    const user = await response.json();
    this.props.setUserAC(user);
  };

  logout = () => {
    this.props.logoutAC();
  };

  handleInput = e => {
    this.setState({ text: e.target.value });
  };

  onClick = async () => {
    await this.props.fetchArtistIdAC(this.state.text);
    await this.props.fetchArtistInfoAC(this.state.text);
    await this.props.switchSearchBarAC();
    await this.props.keepArtistNameAC(this.state.text, this.props.artist.id)
    this.setState({ text: '' })
    this.props.history.push(`/artists/${this.props.artist.id}`);
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <div className="NavLinks">
            <NavLink activeClassName={"Active"} exact={true} to={"/"}>
              Index
            </NavLink>
            {!this.props.user.user
              ? <NavLink activeClassName={"Active"} to={"/login"}>
                Log in
                </NavLink>
              : <NavLink activeClassName={"Active"} to={"/dashboard"}>
                {this.props.user.user.username}
              </NavLink>}
            {!this.props.user.user
              ? <NavLink activeClassName={"Active"} to={"/registration"}>
                Registration
                </NavLink>
              : <Button flat style={{ color: "white", fontSize: "28px" }} onClick={this.logout}> <Link to={"/landing"}>Log out</Link ></Button>}
            <div>
              <input
                className="input"
                name="bandInput"
                type="text"
                value={this.state.text}
                onChange={this.handleInput}
              />
              <Button className="red darken-4 white-text" onClick={this.onClick}>Search<Icon right>search</Icon></Button>
            </div>
            <NavLink activeClassName={"Active"} to={"/explore"}>Explore</NavLink>
            <Youtube />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  artist: state.artist,
  user: state.user
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  switchSearchBarAC,
  keepArtistNameAC,
  setUserAC,
  logoutAC
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar1)
);

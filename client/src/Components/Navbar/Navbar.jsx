import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavLink,
  withRouter
} from "react-router-dom";

import { Button, Icon } from "react-materialize";
import "./navbar.css";

import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  switchSearchBarAC,
  keepArtistNameAC
} from "../../Redux/artistReducer/artistActions";
import {
  setUserAC,
  logoutAC
} from "../../Redux/UserAuth/actions/userAuth";

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
    await this.props.keepArtistNameAC(this.state.text, this.props.artist.id);
    this.setState({ text: "" });
    this.props.history.push(`/artists/${this.props.artist.id}`);
  };


  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <div className="NavLinks">
            <NavLink
              className="NavLink"
              activeClassName={"Active"}
              exact={true}
              to={"/"}
            >
              <img src="img/image.png" style={{ maxHeight: "110px" }} />
            </NavLink>
            <NavLink
              className="NavLink"
              activeClassName={"Active"}
              to={"/explore"}
            >
              Explore
            </NavLink>
            <div>
              <input
                className="input"
                name="bandInput"
                type="text"
                value={this.state.text}
                onChange={this.handleInput}
              />
              <Button
                className="red darken-4 white-text"
                onClick={this.onClick}
              >
                Search<Icon right>search</Icon>
              </Button>
            </div>
            {!this.props.user.user ? (
              <NavLink
                className="NavLink"
                activeClassName={"Active"}
                to={"/login"}
              >
                Log in
              </NavLink>
            ) : (
                <NavLink
                  className="NavLink"
                  activeClassName={"Active"}
                  to={"/dashboard"}
                >
                  {this.props.user.user.username}
                </NavLink>
              )}
            {!this.props.user.user ? (
              <NavLink
                className="NavLink"
                activeClassName={"Active"}
                to={"/registration"}
              >
                Registration
              </NavLink>
            ) : (
                <Button
                  className="NavLink"
                  flat
                  style={{ color: "white", fontSize: "18px" }}
                  onClick={this.logout}
                >
                  Log out
              </Button>
              )}
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

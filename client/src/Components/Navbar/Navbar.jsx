import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  switchSearchBarAC
} from "../../Redux/artistReducer/artistActions";
import { setUserAC, logoutAC } from "../../Redux/UserAuth/actions/userAuth";

import "./navbar.css";

import Youtube from "../Youtube/Youtube";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  componentDidUpdate(prevProps) {
    if (this.props.artist && prevProps.artist !== this.props.artist) {
      this.props.history.push(`/artists/${this.props.artist.id}`);
    }
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
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <div className="NavLinks">
            <NavLink activeClassName={"Active"} exact={true} to={"/"}>
              Index
            </NavLink>
            <NavLink activeClassName={"Active"} to={"/fbpanel"}>
              FBpanel
          </NavLink>
            {!this.props.user.user ?
              <div>
                <NavLink activeClassName={"Active"} to={"/login"}>
                  Log in
                </NavLink>
                <NavLink activeClassName={"Active"} to={"/registration"}>
                  Registration
                </NavLink>
              </div> :
              <div>
                <NavLink activeClassName={"Active"} to={"/userUpdate"}>
                  {this.props.user.user.username}
                </NavLink>
                <button onClick={this.logout}> Log out </button>
              </div>
            }
            <div>
              <input
                className="input"
                name="bandInput"
                type="text"
                value={this.state.text}
                onChange={this.handleInput}
              />
              <button onClick={this.onClick}> search band </button>
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
  setUserAC,
  logoutAC
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);

import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC
} from "../../Redux/artistReducer/artistActions";
import {
  setUserAC
} from "../../Redux/UserAuth/actions/userAuth";

import "./navbar.css";


import Youtube from "../Youtube/Youtube"


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.checkSession()
  }

  componentDidUpdate(prevProps) {
    if (this.props.artist && prevProps.artist !== this.props.artist) {
      this.props.history.push(`/artists/${this.props.artist.id}`);
    }
  }


  checkSession = async () => {
    const response = await fetch('/users/getsession/');
    const user = await response.json();
    this.props.setUserAC({user: user});
  }

  logout = async () => {
    await fetch('/users/logout/');
    const user = null;
    this.props.setUserAC({user: user});
  }

  handleInput = e => {
    this.setState({ text: e.target.value });
   
  };

  onClick = async () => {
    await this.props.fetchArtistIdAC(this.state.text);
    await this.props.fetchArtistInfoAC(this.state.text);
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
            { !this.props.user.user ?
                <div>
                  <NavLink activeClassName={"Active"} to={"/login"}>
                    Log in
                </NavLink>
                  <NavLink activeClassName={"Active"} to={"/registration"}>
                  <div> Registration </div>
                </NavLink>
                </div> :
                <div>
                  <NavLink activeClassName={"Active"} to={"/dashboard"}>
                    {this.props.user.user.username}
                  </NavLink>
                  <button onClick={this.logout}> Log out </button>
                </div>
            }

            {/* <NavLink activeClassName={"Active"} to={"/artist/:id"}> */}
            <div>
              <input className="input" name="bandInput" type="text" value={this.state.text} onChange={this.handleInput} />
              <button onClick={this.onClick}> search band </button>
            </div>
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
  setUserAC
};


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);

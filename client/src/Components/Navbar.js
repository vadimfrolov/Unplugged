import React from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getArtistId, getArtistInfo } from "../redux/actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.artist && prevProps.artist !== this.props.artist) {
      this.props.history.push(`/artists/${this.props.artist.id}`);
    }
  }

  handleInput = e => {
    this.setState({ text: e.target.value });
  };

  onClick = async () => {
    await this.props.getArtistId(this.state.text);
    await this.props.getArtistInfo(this.state.text);
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
            {/* <NavLink activeClassName={"Active"} to={"/artist/:id"}> */}
            <div>
              <input name="bandInput" type="text" value={this.state.text} onChange={this.handleInput} />
              <button onClick={this.onClick}> search band </button>
            </div>
            {/* </NavLink> */}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    artist: store.artist,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getArtistId: textInput => dispatch(getArtistId(textInput)),
    getArtistInfo: textInput => dispatch(getArtistInfo(textInput))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

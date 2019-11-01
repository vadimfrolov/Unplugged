import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "./Home";
import "../App.css";
import FBpanel from "./FBpanel";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
// import Artist from "./Artist";
import Bio from "./ArtistPage/Bio"

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/fbpanel" component={FBpanel} />
            <Route path="/landing" component={LandingPage} />
            <Route path={`/artists/${this.props.artist && this.props.artist.id}`} component={Bio} />
          </Switch>
        </Router>
      </div >
    );
  }
}


const mapStateToProps = store => {
  return {
    artist: store.artist,
  }
}

export default connect(mapStateToProps)(App);

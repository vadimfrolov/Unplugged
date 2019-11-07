import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  addToFavoriteAC,
  removeFavoriteAC
} from "../../Redux/UserActivity/activityActions";

import {
  Button
} from "react-materialize";

import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
} from "../../Redux/artistReducer/artistActions";

import "./ArtistPage.css";

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false
    };
  }
  componentDidMount = async () => {
    this.checkFavorite()
  };

  addToFavorite = async () => {
    await this.props.addToFavoriteAC({
      id: this.props.user._id,
      artist: this.props.artist.name,
    }, this.props.match.params.id)

    this.checkFavorite()
  }

  removeFavorite = async () => {
    await this.props.removeFavoriteAC(
      this.props.user._id,
      this.props.match.params.id
    );
    this.checkFavorite();
  };

  checkFavorite = async () => {
    const check = await this.props.user.favouriteGroups.findIndex((e) => {
      return e.id == this.props.match.params.id
    })
    console.log('AND;LS;OKSH;lkLK;KSlkASLKJADslkADJS',check);
    
    const state = check === -1
    this.setState({ favorite: state })
  }

  render() {

    return (
      <>
        {!this.props.user ? (
          <></>
        ) : (
            <>
              {this.state.favorite ? (
                <Button className="red darken-4" onClick={this.addToFavorite}>Add to favourites</Button>
              ) : (
                  <Button className="red darken-4" onClick={this.removeFavorite}>
                    Remove from favourites{" "}
                  </Button>
                )}
            </>
          )
        }
      </>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist,
  concertPage: store.concertPage,
  user: store.user.user
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  addToFavoriteAC,
  removeFavoriteAC
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikeButton));

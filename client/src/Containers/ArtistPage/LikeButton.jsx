import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Button,
  Icon
} from "react-materialize";

import {
  addToFavoriteAC,
  removeFavoriteAC
} from "../../Redux/UserActivity/activityActions";
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

  checkFavorite = () => {
    const check = this.props.user.favouriteGroups.findIndex((e) => {
      return e.id == this.props.match.params.id
    })

    const state = check === -1
    return state
  }


  render() {
    const isFav = this.checkFavorite()
    return (
      <>
        {!this.props.user ? (
          <></>
        ) : (
            <>
              {isFav ? (
                <Button
                  className="red darken-4"
                  onClick={this.addToFavorite}
                >
                  Add to favourites
                  <Icon right>favorite_border</Icon>
                </Button>
              ) : (
                  <Button
                    className="red darken-4"
                    onClick={this.removeFavorite}
                  >
                    Remove from favourites{" "}
                    <Icon right>delete</Icon>
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

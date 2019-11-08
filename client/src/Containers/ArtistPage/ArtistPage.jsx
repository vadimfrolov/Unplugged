import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import {
  addToFavoriteAC,
  removeFavoriteAC
} from "../../Redux/UserActivity/activityActions";

import M from "materialize-css";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  Icon
} from "react-materialize";

import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  fetchArtistConcertAC,
  getArtistNameAC
} from "../../Redux/artistReducer/artistActions";

import TourSnippetList from "../../Components/TourSnippet/TourSnippetList";
import TagsList from "../../Components/TagsList";
import SimilarArtistsList from "../../Components/SimilarArtists/SimilarArtistsList";
import CommentArtist from "../../Components/CommentsArtist/CommentArtist";
import CommentListArtist from "../../Components/CommentsArtist/CommentListArtist";

import ShowAll from "../../Components/TourSnippet/ShowAll";
import ArtistTopTracks from "../../Components/Youtube/ArtistTopTracks";
import ShowMap from "../../Components/Map/ShowMap";
import LikeButton from './LikeButton'

import FacebookPanel from "../../Components/FacebookPanel";

import "./ArtistPage.css";

class ArtistInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false
    };
  }
  componentDidMount = async () => {
    if (this.props.isSearchBar) {
      console.log('ok')
      // } else if (!this.props.isSearchBar) {
      //   const id = this.props.match.params.id;
      //   if (this.props.concertPage.performance !== undefined) {
      //     const artist = this.props.concertPage.performance.find(
      //       item => item.id == id
      //     );
      //     if (artist !== undefined) {
      //       await this.props.fetchArtistIdAC(artist.displayName);
      //       await this.props.fetchArtistInfoAC(artist.displayName);
      //     }
      //   }
    } else {
      console.log('ololololo')
      const id = this.props.match.params.id
      await this.props.getArtistNameAC(id);
      await this.props.fetchArtistIdAC(this.props.artist.fetchedName);
      console.log(this.props.artist.fetchedName)
      await this.props.fetchArtistInfoAC(this.props.artist.fetchedName);
    }
  };

  addToFavorite = async () => {
    await this.props.addToFavoriteAC(
      this.props.user._id,
      this.props.match.params.id
    );
    this.checkFavorite();
  };

  removeFavorite = async () => {
    await this.props.removeFavoriteAC(
      this.props.user._id,
      this.props.match.params.id
    );
    this.checkFavorite();
  };

  checkFavorite = async () => {
    const check = await this.props.user.favoriteGroups.findIndex(e => {
      return e == this.props.match.params.id;
    });
    const state = check === -1;
    this.setState({ favorite: state });
  };

  render() {
    const { artist } = this.props;
    const name = get(artist, "name");
    const content = get(artist, "bio.content");
    const pic = get(artist, "pic");

    return (
      <div>
        <div className="artistWrapper">
          <div className="artistNameArt flow-text">{name}</div>
          <div className="imageWrapper">
            <img src={pic} style={{ maxHeight: "300px" }} />
          </div>
        </div>
        <Row className="flex">
          <Col m={12} s={12}>
            <Card
              className="black darken-1"
              textClassName="white-text"
              title="Biography"
              actions={[
                <Modal
                  trigger={<Button className="red darken-4">Show full bio<Icon right>zoom_out_map</Icon></Button>}
                >
                  <p className="insideBio">{content}</p>
                </Modal>
              ]}
            >
              <div style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{content}</div>
            </Card>
          </Col>
        </Row>
        <Row className="rowWrapper flex">
          <Col s={6} className="black white-text">
            <p className="genresName">Genres</p>
            <TagsList />
            <p style={{ marginTop: "35px" }} className="genresName">Similar artists</p>
            <SimilarArtistsList />
            <ArtistTopTracks />
            <p className="genresName">Comments</p>
            <CommentArtist nameArtist={artist.name} idArtist={artist.id} />
            <CommentListArtist commentsArtists={artist.comments} />
          </Col>

          <Col s={6} className="black white-text">
            <p className="genresName">Upcoming concerts</p>
            <TourSnippetList />
            <div style={{ marginBottom: "100px", marginRight: "100px" }}>
              {!this.props.user ? (
                <></>
              ) : (
                  <>
                    <LikeButton user={this.props.user} />
                  </>
                )}
              <ShowAll id={artist.id} />
              <ShowMap id={artist.id} />
            </div>
            <div style={{ width: "700px" }}>
              <FacebookPanel />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  artist: store.artist,
  concertPage: store.concertPage,
  user: store.user.user,
  fetchedName: store.fetchedName
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  addToFavoriteAC,
  removeFavoriteAC,
  getArtistNameAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistInfo));

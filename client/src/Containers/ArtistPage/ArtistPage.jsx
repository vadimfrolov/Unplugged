import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import get from "lodash.get";

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
  addToFavoriteAC,
  removeFavoriteAC
} from "../../Redux/UserActivity/activityActions";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  getArtistNameAC
} from "../../Redux/artistReducer/artistActions";

import TourSnippetList from "../../Components/TourSnippet/TourSnippetList";
import TagsList from "../../Components/TagsList";
import SimilarArtistsList from "../../Components/SimilarArtists/SimilarArtistsList";
import CommentArtist from "../../Components/CommentsArtist/CommentArtist";
import CommentListArtist from "../../Components/CommentsArtist/CommentListArtist";
import Spinner from "../../Components/Spinner";
import ShowAll from "../../Components/TourSnippet/ShowAll";
import ArtistTopTracks from "../../Components/Youtube/ArtistTopTracks";
import ShowMap from "../../Components/Map/ShowMap";
import LikeButton from "./LikeButton";
import FacebookPanel from "../../Components/FacebookPanel";

import "./ArtistPage.css";


class ArtistInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      isLoading: true
    };
  }

  componentDidMount = async () => {
    if (!this.props.isSearchBar) {
      const id = this.props.match.params.id;
      await this.props.getArtistNameAC(id);
      await this.props.fetchArtistIdAC(this.props.artist.fetchedName);
      await this.props.fetchArtistInfoAC(this.props.artist.fetchedName);
    }
    this.setState({ isLoading: false });
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
      <>
        {this.state.isLoading ? <Spinner /> :
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
                      trigger={
                        <Button className="red darken-4">
                          Show full bio
                          <Icon right>zoom_out_map</Icon>
                        </Button>
                      }
                    >
                      <p className="insideBio">{content}</p>
                    </Modal>
                  ]}
                >
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {content}
                  </div>
                </Card>
              </Col>
            </Row>
            <Row className="rowWrapper flex">
              <Col s={6} className="black white-text">
                <p className="genresName">Genres</p>
                <TagsList />
                <p
                  style={{ marginTop: "35px" }}
                  className="genresName"
                >
                  Similar artists
                </p>
                <SimilarArtistsList />
                <ArtistTopTracks />
                <p className="genresName">Comments</p>

                {!this.props.user ? (
                  <CommentListArtist
                    commentsArtists={artist.comments}
                    idArtist={artist.id}
                  />
                ) : (
                    <>
                      <CommentArtist
                        nameArtist={artist.name}
                        idArtist={artist.id}
                      />
                      <CommentListArtist
                        commentsArtists={artist.comments}
                        idArtist={artist.id}
                        idUser={this.props.user._id}
                      />
                    </>
                  )}
              </Col>

              <Col s={6} className="black white-text">
                <p className="genresName">Upcoming concerts</p>
                <TourSnippetList />
                <div style={{ marginBottom: "100px", marginRight: "100px" }}>
                  {!this.props.user ? (
                    <></>
                  ) : (
                      <>
                        <LikeButton
                          user={this.props.user}
                          artistFromParent={this.props.artist}
                        />
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
        }
      </>
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

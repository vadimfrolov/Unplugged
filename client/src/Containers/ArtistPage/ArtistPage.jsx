import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import M from "materialize-css";
import {
  Card,
  Row,
  Col,
  Modal,
  Button
} from "react-materialize";

import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  fetchArtistConcertAC
} from "../../Redux/artistReducer/artistActions";

import TourSnippetList from "../../Components/TourSnippet/TourSnippetList";
import TagsList from "../../Components/TagsList";
import SimilarArtistsList from "../../Components/SimilarArtists/SimilarArtistsList";
import FacebookPanel from "../../Components/FacebookPanel";
import ShowAll from "../../Components/TourSnippet/ShowAll";
import ArtistTopTracks from "../../Components/ArtistTopTracks";
import ShowMap from "../../Components/Map/ShowMap";

import "./ArtistPage.css";

class ArtistInfo extends Component {
  async componentDidMount() {
    if (this.props.isSearchBar) {
    } else {
      const id = this.props.match.params.id;
      if (this.props.concertPage.performance !== undefined) {
        const artist = this.props.concertPage.performance.find(
          item => item.id == id
        );
        if (artist !== undefined) {
          this.props.fetchArtistIdAC(artist.displayName);
          this.props.fetchArtistInfoAC(artist.displayName);
        }
      }
    }
  }

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
                  trigger={<Button className="red darken-4">Show full bio</Button>}
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
            <p className="genresName">Genres:</p>
            <TagsList />
            <p style={{marginTop:"35px"}}  className="genresName">Similar artists:</p>
            <SimilarArtistsList />
            <ArtistTopTracks />
          </Col>

          <Col s={6} className="black white-text">
            <p className="genresName">Upcoming concerts:</p>
            <TourSnippetList />
            <div style={{marginBottom: "100px", marginRight: "100px"}}>
            <ShowAll id={artist.id} />
            <ShowMap id={artist.id}/>
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
  concertPage: store.concertPage
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  fetchArtistConcertAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistInfo));

import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import { addToFavoriteAC, removeFavoriteAC } from '../../Redux/UserActivity/activityActions';
import M from "materialize-css";
import {
  CollapsibleItem,
  Collapsible,
  Icon,
  Chip,
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
import ArtistTopTracks from "../../Components/Youtube/ArtistTopTracks";
import ShowMap from "../../Components/Map/ShowMap";

import "./ArtistPage.css";

class ArtistInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
  };
  componentDidMount = async () => {
    if (this.props.isSearchBar) {
    } else {
      const id = this.props.match.params.id;
      if (this.props.concertPage.performance !== undefined) {
        const artist = this.props.concertPage.performance.find(
          item => item.id == id
        );
        if (artist !== undefined) {
          await this.props.fetchArtistIdAC(artist.displayName);
          await this.props.fetchArtistInfoAC(artist.displayName);
        }
      }
    }

    this.checkFavorite()
  }

  addToFavorite = async () => {
    await this.props.addToFavoriteAC({
      id: this.props.user._id,
      artist: this.props.artist.name,
    }, this.props.match.params.id)
    this.checkFavorite()
  }

  removeFavorite = async () => {
    await this.props.removeFavoriteAC(this.props.user._id, this.props.match.params.id)
    this.checkFavorite()
  }

  checkFavorite = async () => {
    const check = await this.props.user.favouriteGroups.findIndex((e) => {
      return e.id == this.props.match.params.id
    })
    const state = check === -1
    this.setState({ favorite: state })
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

        {/* <div className="colWrapper">
          <Collapsible accordion={false}>
            <CollapsibleItem
              header={content.slice(0, 500)}
              icon={<Icon left>touch_app</Icon>}
              className="collapsItem"
            >
              {content}
            </CollapsibleItem>
          </Collapsible>
        </div> */}

        <div>   </div>
        <Row>
          <Col m={12} s={12}>
            <Card
              className="black truncate  darken-1"
              textClassName="white-text"
              title="Biography"
              actions={[
                <Modal

                  trigger={<Button className="red darken-4"> Show full bio </Button>}
                >
                  <p className="insideBio">{content}</p>
                </Modal>
              ]}
            >
              <div>{content}</div>
            </Card>
          </Col>
        </Row>


        {/* <div className="truncate bioPage black">{content}</div>

        <Modal
          header="Bio"
          trigger={<Button className="red darken-4"> Show bio </Button>}
        >
          <p className="insideBio">{content}</p>
        </Modal> */}
        {/* 
        <Modal header="Modal Header" trigger={<Button > show concerts </Button>}>
          <p> <ShowMap id={artist.id} /></p>
        </Modal> */}

        <Row className="rowWrapper flex">
          <Col s={6} className="black white-text">
            <p className="genresName">Genres:</p>
            <TagsList />
            <p className="genresName">Similar artists:</p>
            <SimilarArtistsList />
            <ArtistTopTracks />
          </Col>

          <Col s={6} className="black white-text">
            <p className="genresName">Upcoming concerts:</p>
            <TourSnippetList />
            {!this.props.user ?
          <></> :
          <>
          {this.state.favorite ?
            <button onClick={this.addToFavorite}>add to favorite </button>:
              <button onClick={this.removeFavorite}>remove from fav </button>
            }
          </>
        }
            <ShowAll id={artist.id} />
            <ShowMap id={artist.id} />
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
)(withRouter(ArtistInfo));

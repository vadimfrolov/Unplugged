import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter, Link } from "react-router-dom";

import "./concertPage.css";

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";

// import Flashmob from "../../Components/Flashmob";
// import CommentSection from "../../Components/CommentsConcert";
// import CommentList from "../../Components/CommentsConcert/CommentList";

import {

  Row,
  Col,
  Card,
  Button
} from "react-materialize";

class ConcertPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchConcertInfoAC(id);
  }

  render() {
    const { concertPage } = this.props;

    const id = get(concertPage, "id");
    const name = get(concertPage, "displayName");
    const date = get(concertPage, "start.date");
    const time = get(concertPage, "start.time");
    const venue = get(concertPage, "venue.displayName");
    const performers = get(concertPage, "performance");
    const location = get(concertPage, "location.city");
    const comments = get(concertPage, "comments");

    return (
      <div className="cardPage">
        <Row>
          <Col m={8} s={12}>
            <Card
              className="black"
              textClassName="white-text"
              title={name}
              actions={[
                <Button className="red darken-4">I'll be there!</Button>
              ]}
            >
              <p className="pointConcert" >
                <span className="red-text ">When:</span> {date} {time}
              </p>
              <p>
                <span className="red-text ">Where: </span>
                {venue}, {location},
              </p>
              <span className="red-text t">Perfomers:</span>
          
                {performers &&
                  performers.map((el, i) => (
                    <li className="perfomersList" key={`${name}_${i}`}>
                      <Link to={`/artists/${performers[i].id}`}>
                        {el.displayName}
                      </Link>
                    </li>
                  ))}
        
            </Card>
          </Col>
        </Row>

        {/* <p>
          {name},{date},{time},{venue},{location},
          {performers &&
            performers.map((el, i) => (
              <p key={`${name}_${i}`}>
                <Link to={`/artists/${performers[i].id}`}>
                  {el.displayName}
                </Link>
              </p>
            ))}
        </p>
        <button>I'll be there!</button> */}
        {/* <Flashmob />
        <CommentSection nameArtist={performers} idConcert={id} />
        <CommentList comments={comments} /> */}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist,
  concerts: store.concerts,
  concertPage: store.concertPage
  // concerts: store.concertPage
});

const mapDispatchToProps = {
  fetchConcertInfoAC
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage));

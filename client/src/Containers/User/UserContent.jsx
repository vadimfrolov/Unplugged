import React, { Component } from "react";
import dataUser from "../../Data/dataUser";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchArtistIdAC, fetchArtistInfoAC, keepArtistNameAC } from "../../Redux/artistReducer/artistActions";

import UserMapContainer from "../../Components/UserGeo/UserMap";

import M from "materialize-css";
import {
  Container,
  Card,
  Row,
  Col,
  Modal,
  Button,
  Icon
} from "react-materialize";

import "./user.css";

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      prevConcerts: null,
      upcomingConcerts: null,
      mapFlag: null
    };
  }

  componentDidMount = () => {
    this.userActivity();
  };

  userActivity = () => {
    const sortUpcomingConc = this.props.user.user.upcomingConcerts.sort(
      (a, b) => (a.date > b.date ? 1 : -1)
    );
    const sortPrevConc = this.props.user.user.upcomingConcerts.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
    this.setState({
      prevConcerts: sortPrevConc,
      sortPrevConc: sortUpcomingConc
    });
  };

  onClick = async (e, id) => {
    const name = e;
    const artistId = id
    console.log("hhhhhhhhhuuuuuuuuuuuiiiiiiiii", artistId)
    await this.props.fetchArtistIdAC(name);
    await this.props.fetchArtistInfoAC(name);
    await this.props.keepArtistNameAC(name, artistId)
    this.props.history.push(`/artists/${artistId}`);
  }

  render() {
    const { username } = this.state.user;

    return (
      <div>
        <Row>
          <Col m={9}>
            <Col m={4} style={{ marginTop: "40px", marginRight: "-150px" }}>
              <div className="avatarWrapper">
                <div className="avatarMap">
                  <div className="avatar">
                    <img
                      src={dataUser.user.profilePic}
                      className="userAvatar"
                      alt="profile picture"
                    />
                    <p style={{ textAlign: "center" }} className="User">{this.props.user.user.username}</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col m={4} style={{ marginTop: "40px", marginRight: "50px" }}>
              <Card
                className="black"
                textClassName="white-text"
                actions={[
                  <Button className="red darken-4">Show All</Button>
                ]}
                style={{ borderRadius: "10%" }}>

                <p style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "25px", color: "#b71c1c" }} className="pointConcert" >
                  Future concerts:
              </p>
                <ul>
                  {this.state.user.user.upcomingConcerts
                    .slice(-3)
                    .map(concert => (
                      <Link to={`/concert/${concert.concertId}`}>
                        <li style={{ marginBottom: "25px", fontSize: "25px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {" "}
                          <span style={{ color: "red", marginRight: "5%" }}>
                            {concert.formatDate}
                          </span>
                          {concert.group}
                        </li>
                      </Link>
                    ))}
                </ul>
              </Card>
            </Col>
            <Col m={4} style={{ marginTop: "40px" }}>
              <Card
                className="black"
                textClassName="white-text"
                actions={[
                  <Button className="red darken-4">Show All</Button>
                ]}
                style={{ borderRadius: "10%" }}>

                <p style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "25px", color: "#b71c1c" }} className="pointConcert" >
                  Recent concerts:
              </p>
                <ul>
                  {this.state.user.user.previousConcerts
                    .slice(-3)
                    .map(concert => (
                      <Link to={`/concert/${concert.concertId}`}>
                        <li style={{ marginBottom: "25px", fontSize: "25px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {" "}
                          <span style={{ color: "red", marginRight: "5%" }}>
                            {concert.formatDate}
                          </span>
                          {concert.group}
                        </li>
                      </Link>
                    ))}
                </ul>
              </Card>
            </Col>
            <Row>
              <Col m={11}>
                <div style={{ backgroundColor: "black" }}>
                  <p style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold", margin: "40px", padding: "20px", color: "#b71c1c" }}>
                    My concert geography
                    </p>
                  <UserMapContainer user={this.props.user} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Col m={12} style={{ marginTop: "40px" }}>
              <Card
                className="black"
                textClassName="white-text"
                // actions={[
                //   <Button className="red darken-4">Show All</Button>
                // ]}
                style={{ borderRadius: "10%", paddingRight:"10px" }}
                >

                <p style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "25px", color: "#b71c1c" }} className="pointConcert" >
                  I follow:
              </p>
                <ul>
                  {this.props.user.user.favouriteGroups.map(group => (
                    <Link to={`/artists/${group.id}`} value={group.artist} onClick={() => this.onClick(group.artist, group.id)}>
                      <li style={{ fontSize: "25px", marginBottom: "25px" }}>{group.artist}</li>
                    </Link>
                  ))}
                </ul>
              </Card>
            </Col>
          </Col>
        </Row>

      </div >
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist,
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserContent));

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC
} from "../../Redux/artistReducer/artistActions";

import M from "materialize-css";
import {
  Card,
  Row,
  Col,
  Modal,
  Button
} from "react-materialize";

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }

  render() {
    const { username } = this.state.user;

    return (
      <div>
        {!this.props.user.user ? (
          <></>
        ) : (
          <div className="avatarWrapper">
            {JSON.stringify(this.props.user.user.username)}

            <div className="avatar">
              <div
                className="User"
                style={{ fontSize: "50px", fontWeight: "600" }}
              >
                {" "}
                {username}{" "}
              </div>
              <img
                src={dataUser.user.profilePic}
                style={{ width: "150px" }}
                alt="profile picture"
              />
            </div>

            <div>
              <Row>
                              
                                      
             {/* Favourite artists  */}
                <Col m={4} s={4}>
                  <Card
                    className="black darken-1"
                    textClassName="white-text"
                    title="Favourite artists"
                    actions={[
                      <Modal
                        trigger={
                          <Button className="red darken-4">
                            {" "}
                            Show all artists{" "}
                          </Button>
                        }
                      >
                        <p>{artistFull}</p>
                      </Modal>
                    ]}
                  >
                    <div>{artistShort}</div>
                  </Card>
                </Col>


               {/* Upcoming concerts  */}
                <Col m={4} s={4}>
                  <Card
                    className="black darken-1"
                    textClassName="white-text"
                    title="Upcoming concerts"
                    actions={[
                      <Modal
                        trigger={
                          <Button className="red darken-4">
                            {" "}
                            Show all concerts{" "}
                          </Button>
                        }
                      >
                        <p>{UpcomingConcertsFULL}</p>
                      </Modal>
                    ]}
                  >
                    <div>{UpcomingConcertsSHORT}</div>
                  </Card>
                </Col>


             {/* Last concerts  */}
                <Col m={4} s={4}>
                  <Card
                    className="black darken-1"
                    textClassName="white-text"
                    title="Last concerts"
                    actions={[
                      <Modal
                        trigger={
                          <Button className="red darken-4">
                            {" "}
                            Show all concerts{" "}
                          </Button>
                        }
                      >
                        <p>{LastConcertsFull}</p>
                      </Modal>
                    ]}
                  >
                    <div>{LastConcertsShort}</div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

//
export default connect(
  mapStateToProps,
  null
)(UserComponent);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registrationAC } from '../../Redux/UserAuth/actions/userAuth';
import { Link } from "react-router-dom";
import M from "materialize-css";
import {
  Container,
  Card,
  Row,
  Col,
  Button
} from "react-materialize";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
      password: null,
    }
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  registration = () => {
    this.props.registrationAC(this.state)
  }

  render() {
    return (
      <Container>
        <Row style={{ marginTop: "40px" }}>
          <Col m={3} s={12}></Col>
          <Col m={6} s={12}>
            <Card className="black"
              textClassName="white-text"
              title="Registration">
              <div>
                <input style={{ color: "white" }} type="text" placeholder="Username" name="username" onChange={this.onChangeUsername} />
                <input style={{ color: "white" }} type="email" placeholder="E-mail" name="email" onChange={this.onChangeEmail} />
                <input style={{ color: "white" }} type="password" placeholder="Password" bsSize="lg" name="password" onChange={this.onChangePassword} />
                <Link to={"/dashboard"}> <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.registration}>Register</Button> </Link >
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(store) {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  registrationAC
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
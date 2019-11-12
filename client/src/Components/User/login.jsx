import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import M from "materialize-css";
import {
  Container,
  Card,
  Row,
  Col,
  Button
} from "react-materialize";

import {
  loginAC,
  logoutAC
} from '../../Redux/UserAuth/actions/userAuth';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  login = () => {
    this.props.loginAC(this.state)
  }

  logout = () => {
    this.props.logoutAC()
  }


  render() {
    return (
      <Container>
        <Row style={{ marginTop: "22px" }}>
          <Col m={3} s={12}></Col>
          <Col m={6} s={12}>
            <Card
              className="black"
              textClassName="white-text"
              title="Log In">
              <div>
                <input
                  style={{ color: "white" }}
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={this.onChangeUsername}
                />
                <input
                  style={{ color: "white" }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChangePassword}
                />
                <Link to={"/dashboard"}>
                  <Button
                    style={{ backgroundColor: "#b71c1c" }}
                    onClick={this.login}
                  >
                    Log In
                  </Button>
                </Link >
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  loginAC,
  logoutAC,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);

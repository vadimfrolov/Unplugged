import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAC, logoutAC } from '../../Redux/UserAuth/actions/userAuth'

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

  logout = () => {
    this.props.logoutAC()
  }

  login = () => {
    this.props.loginAC(this.state)
  }
  

  render() {
    return (
      <div>
        <input placeholder='login' onChange={this.onChangeUsername}></input>
        <input placeholder='password' type='password' onChange={this.onChangePassword}></input>
        <button onClick={this.login}>login</button>
      </div>
    )
  }
}


function mapStateToProps(store) {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  loginAC,
  logoutAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
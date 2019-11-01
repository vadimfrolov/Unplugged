import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import {setUserAC} from '../redux/actions'

const Navbar = (props) => {
  return (
    <div className="Home">
      <div className="Home-header">
        <div className="NavLinks">
          <NavLink activeClassName={"Active"} exact={true} to={"/"}>
            Index
          </NavLink>
          <NavLink activeClassName={"Active"} to={"/fbpanel"}>
            FBpanel
          </NavLink>
          {(!props.user) ?
          <div>
            <NavLink activeClassName={"Active"} to={"/login"}>
              Log in
          </NavLink>
          <NavLink activeClassName={"Active"} to={"/registration"}>
             registration
            </NavLink>
          </div> :
            <NavLink activeClassName={"Active"} onClick={async () => {
                await fetch('/api/user/logout/');
                const user = null;
                this.props.setUser(user)
              }}>
              Log out
            </NavLink>
          }
          {/* <NavLink activeClassName={"Active"} to={"/artist/:id"}> */}
          <div>
            <input name="groupInput" />
            <button> search group </button>
          </div>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUserAC(user)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

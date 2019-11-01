import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
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
          {/* <NavLink activeClassName={"Active"} to={"/artist/:id"}> */}
          <div>
          <input name="groupInput"></input>
            <button> search group </button>
            </div>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

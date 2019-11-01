import React from "react";
import { NavLink, Route } from "react-router-dom";
import Youtube from "./youtube/Youtube";

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
          <NavLink activeClassName={"Active"} to={"/youtube"}>
            YouTube
          </NavLink>
          <Route component={Youtube} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

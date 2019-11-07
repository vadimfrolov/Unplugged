import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import {

Button, Icon
} from "react-materialize";



export default class ShowMap extends Component{
    render(){
        return(
            <Link to={`/map/${this.props.id}`}>
             <Button className="red darken-4">Show concerts map<Icon large right>map</Icon></Button>
             </Link>

        )
    }
}

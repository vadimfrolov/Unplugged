import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";



export default class ShowMap extends Component{
    render(){
        return(
            <Link to={`/map/${this.props.id}`}>
             <button>show map</button>
             </Link>

        )
    }
}
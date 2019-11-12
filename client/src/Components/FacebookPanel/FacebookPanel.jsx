import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";

import {
  FacebookProvider,
  Like,
  Page
} from "react-facebook";


class FBpanel extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.setState({ name: "bla" })
  }


  render() {
    const { artist } = this.props;
    const name = get(artist, "name").replace(/ /g, '');

    return (
      <div>
        <FacebookProvider appId="2488352004782403">
          <Page className="pageFace"
            href={`https://www.facebook.com/${name}/`}
            width="700px"
            height="700px"
            tabs="timeline"
          />
          <Like
            href={`https://www.facebook.com/${name}/`}
            colorScheme="dark"
            showFaces
            share
          />
        </FacebookProvider>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  artist: store.artist
});


export default connect(mapStateToProps)(FBpanel);

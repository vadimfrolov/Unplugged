import React, { Component } from "react";
import { FacebookProvider, Like, Page, Comments } from "react-facebook";
// import InstagramEmbed from "react-instagram-embed"; // для импорта 1 поста
// let account_URL = "https://www.facebook.com/Metallica/";
import InstaGrid from "../InstaPanel/InstaGrid";

export default class FBpanel extends Component {
  render() {
    return (
      <div>
        <div>
          <InstaGrid account="elbrus.bootcamp" numberOfMediaElements={9} />
        </div>
        <div class="elfsight-app-ca9b3796-6542-48be-a4b4-2e2be5fa2221"></div>

        <FacebookProvider appId="2488352004782403">
          <Page href="https://www.facebook.com/Metallica/" tabs="timeline" />
          <Like
            href="https://www.facebook.com/Metallica/"
            colorScheme="dark"
            showFaces
            share
          />
          <Comments href="https://www.facebook.com/Metallica/" />
        </FacebookProvider>
      </div>
    );
  }
}

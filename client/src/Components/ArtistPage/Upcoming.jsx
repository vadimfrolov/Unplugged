import React, { Component } from "react";

class Upcoming extends Component {
  constructor(props) {
    super(props);
    this.state = { gigName: [], gigLocation: [], gigDate: [] };
  }

  callUpcoming = async () => {
    const resUp = await fetch("https://api.songkick.com/api/3.0/artists/233066/calendar.json?apikey=gQiI75sO6fDuKGq0&per_page=5");
    const dataUp = await resUp.json();
    console.log(dataUp.resultsPage.results.event)
    const gigName = dataUp.resultsPage.results.event.map(el => el.displayName)
    const gigLocation = dataUp.resultsPage.results.event.map(el => el.location.city);
    const gigDate = dataUp.resultsPage.results.event.map(el => el.start.date);
    this.setState({ gigName, gigLocation, gigDate})

    // !!! FOR CONCERT PAGE !!!

    // const gigTime = dataUp.resultsPage.results.event.map(el => el.start.time);
    // console.log(gigTime)
    // const gigPerformers = dataUp.resultsPage.results.event.map(el => el.performance);
    // console.log(gigPerformers)

  };


  componentDidMount() {
    this.callUpcoming();
  }

  render() {
    return (
      <div>
        <p>{this.state.gigName.map(n => `${n} ~/////~ `)}</p>
        <p>{this.state.gigLocation.map(l => `${l} ~/////~ `)}</p>
        <p>{this.state.gigDate.map(d => `${d} ~////~ `)}</p>
        <button>Show All</button>
      </div>
    );
  }
}

export default Upcoming;
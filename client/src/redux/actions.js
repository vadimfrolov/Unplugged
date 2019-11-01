import { FETCH_PAST_DATES, FETCH_DATE } from "./types";

require("dotenv").config();
let songkickKey = process.env.REACT_APP_SONGKICK_KEY;
console.log(songkickKey)
const fetchPastDatesAC = years => {
  return {
    type: FETCH_PAST_DATES,
    years: years
  };
};

const fetchDateAC = events => {
  return {
    type: FETCH_DATE,
    events: events
  };
};

const fetchPastDates = page => {
  let arrDate = [];
  return async dispatch => {
    const resp = await fetch(
      `https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey=${songkickKey}&page=${page}`
    );
    const data = await resp.json();
    const arrayData = data.resultsPage.results.event;
    if (arrayData === undefined) {
      return false;
    } else {
      for (let i = 0; i < arrayData.length; i++) {
        let date = arrayData[i].start.date.slice(0, 4);
        arrDate.push(date);
      }
    }
    // console.log(page);
    let uniqueYear = [...new Set(arrDate)];
    // console.log("ololo", uniqueYear);
    return uniqueYear;
    // dispatch(fetchPastDatesAC(uniqueYear));
  };
};

const fetchDate = year => {
  return async dispatch => {
    const resp = await fetch(
      `https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey=${songkickKey}&min_date=${year}-01-01&max_date=${year}-12-31`
    );
    const data = await resp.json();
    const events = data.resultsPage.results.event;
    let objStore = {};
    let finalArr = [];
    events.map(event => {
      objStore = {};
      objStore.date = event.start.date;
      objStore.country = event.location.city;
      objStore.location = { lat: event.location.lat, lng: event.location.lng };
      finalArr.push(objStore);
    });

    dispatch(fetchDateAC(finalArr));
  };
};

export { fetchPastDates, fetchPastDatesAC, fetchDate };

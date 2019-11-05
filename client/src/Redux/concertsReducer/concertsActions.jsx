require("dotenv").config();
let songkickKey = process.env.REACT_APP_SONGKICK_KEY;

export const TYPES = {
  FETCH_PAST_DATES: "FETCH_PAST_DATES",
  FETCH_DATE: "FETCH_DATE"
};

export const fetchPastDatesAC = years => {
  return {
    type: TYPES.FETCH_PAST_DATES,
    payload: years
  };
};

export const fetchDateAC = events => {
  return {
    type: TYPES.FETCH_DATE,
    payload: events
  };
};

export const fetchPastDates = (id, page) => {
  let arrDate = [];
  return async dispatch => {
    const resp = await fetch(
      `https://api.songkick.com/api/3.0/artists/${id}/gigography.json?apikey=${songkickKey}&page=${page}`
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
    let uniqueYear = [...new Set(arrDate)];
    return uniqueYear;
  };
};

export const fetchDate = (id, year) => {
  return async dispatch => {
    const resp = await fetch(
      `https://api.songkick.com/api/3.0/artists/${id}/gigography.json?apikey=${songkickKey}&min_date=${year}-01-01&max_date=${year}-12-31`
    );
    const data = await resp.json();
   
    const events = data.resultsPage.results.event;
    let objStore = {};
    let finalArr = [];
    events &&
      events.map(event => {
        objStore = {};
        objStore.idConcert=event.id
        objStore.date = event.start.date;
        objStore.country = event.location.city;
        objStore.location = {
          lat: event.location.lat,
          lng: event.location.lng
        };
        finalArr.push(objStore);
      });

    const newArr = finalArr;

    dispatch(fetchDateAC(newArr));
  };
};

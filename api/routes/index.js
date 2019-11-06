var express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");

require("dotenv").config();
var router = express.Router();
let SongKickKey = process.env.REACT_APP_SONGKICK_KEY;
let LastFmKey = process.env.REACT_APP_LASTFM_API_KEY;

router.post("/getId", async (req, res) => {
  let bandInput = req.body.text;
  const resID = await fetch(
    `https://api.songkick.com/api/3.0/search/artists.json?apikey=${SongKickKey}&query=${bandInput}`
  );
  const dataID = await resID.json();
  console.log(resID, dataID);
  const id = dataID.resultsPage.results.artist[0].id;
  
  res.json({ id });
});

router.post("/search", async (req, res) => {
  let bandInput = req.body.text;
  const resSearch = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandInput}&api_key=${LastFmKey}&format=json`
  );
  const dataSearch = await resSearch.json();
  const topTracksApiCall = await axios.get(
    `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${bandInput}&api_key=${LastFmKey}&format=json`
  );

  dataSearch.topTracks = topTracksApiCall.data.toptracks.track.slice(0, 10);
  res.json({ dataSearch });
});

router.get("/concert/:id", async (req, res) => {
  let concertId = req.params.id;
  console.log(concertId);
  const resConcertInfo = await fetch(
    `https://api.songkick.com/api/3.0/events/${concertId}.json?apikey=${SongKickKey}`
  );
  const ConcertInfo = await resConcertInfo.json();
  const info = ConcertInfo.resultsPage.results.event;
  res.json({ info });
});

router.get("/artists/:id", async (req, res) => {
  const bandId = req.params.id;
  const resConcerts = await fetch(
    `https://api.songkick.com/api/3.0/artists/${bandId}/calendar.json?apikey=${SongKickKey}&per_page=5`
  );
  const dataConcerts = await resConcerts.json();
  res.json({ dataConcerts });
});

router.get('/explore', async (req, res) => {
  const resExplore = await fetch(`https://api.songkick.com/api/3.0/metro_areas/32051/calendar.json?apikey=${SongKickKey}`);
  const dataExplore = await resExplore.json();
  res.json({dataExplore})
});

router.get('/explore/:page', async (req, res) => {
  const resExplore = await fetch(`https://api.songkick.com/api/3.0/metro_areas/32051/calendar.json?apikey=${SongKickKey}&page=${req.params.page}`);
  const dataExplore = await resExplore.json();
  res.json({dataExplore})
});

router.post('/explore/:id', async (req, res) => {
  let date = req.body.formattedDate;
  const resDate = await fetch(`https://api.songkick.com/api/3.0/metro_areas/32051/calendar.json?apikey=${SongKickKey}&min_date=${date}&max_date=${date}`);
  const dataDate = await resDate.json();
  res.json({dataDate})
});


module.exports = router;

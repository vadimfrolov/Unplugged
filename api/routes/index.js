var express = require('express');
const fetch = require("node-fetch");

require('dotenv').config();
var router = express.Router();
let SongKickKey = process.env.SONGKICK_KEY;
let LastFmKey = process.env.LASTFM_KEY;


router.post('/getId', async (req, res) => {
  let bandInput = req.body.text;
  const resID = await fetch(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${SongKickKey}&query=${bandInput}`);
  const dataID = await resID.json();
  const id = dataID.resultsPage.results.artist[0].id;
  res.json({ id });
});

router.post('/search', async (req, res) => {
  let bandInput = req.body.text;
  const resSearch = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandInput}&api_key=${LastFmKey}&format=json`);
  const dataSearch = await resSearch.json();
  res.json({ dataSearch })
});

router.get('/concert/38489024', async (req, res) => {
  // let concertId = req.params.id;
  // console.log(concertId)
  const resConcertInfo = await fetch(`https://api.songkick.com/api/3.0/events/38489024.json?apikey=${SongKickKey}`);
  const ConcertInfo = await resConcertInfo.json();
  const info = ConcertInfo.resultsPage.results.event;
  res.json({ info })
});

router.get('/artists/:id', async (req, res) => {
  const bandId = req.params.id;
  const resConcerts = await fetch(`https://api.songkick.com/api/3.0/artists/${bandId}/calendar.json?apikey=${SongKickKey}&per_page=5`);
  const dataConcerts = await resConcerts.json();
  res.json({dataConcerts})
});

module.exports = router;

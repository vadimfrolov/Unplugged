var express = require('express');
const fetch = require("node-fetch");

require('dotenv').config();
var router = express.Router();
let SongKickKey = process.env.SONGKICK_KEY;
let LastFmKey = process.env.LASTFM_KEY;

router.post('/getid', async (req, res) => {
  let bandInput = req.body.text;
  const resID = await fetch(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${SongKickKey}&query=${bandInput}`);
  const dataID = await resID.json();
  console.log(dataID)
  const id = dataID.resultsPage.results.artist[0].id;
  res.json({ id });
  // res.redirect(`/artists/${id}`);
});

router.post('/search', async (req, res) => {
  let bandInput = req.body.text;
  const resSearch = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandInput}&api_key=${LastFmKey}&format=json`);
  const dataSearch = await resSearch.json();
  // console.log(dataSearch)
  res.json({ dataSearch })
});

// router.get('/artists/:id', async (req, res) => {

// });

module.exports = router;

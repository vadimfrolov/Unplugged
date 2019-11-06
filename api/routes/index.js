var express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");
require('dotenv').config();
var router = express.Router();

let SongKickKey = process.env.SONGKICK_KEY;
let LastFmKey = process.env.LASTFM_KEY;
let YouTubeKey = process.env.SECOND_YOUTUBE_API_KEY;

const Concert = require("../models/concert");

router.post("/getId", async (req, res) => {
  let bandInput = encodeURIComponent(`${req.body.text}`);
  const resID = await fetch(
    `https://api.songkick.com/api/3.0/search/artists.json?apikey=${SongKickKey}&query=${bandInput}`
  );
  const dataID = await resID.json();
  const id = dataID.resultsPage.results.artist[0].id;
  // const name = dataID.resultsPage.results.artist[0].displayName;
  // console.log(dataID.resultsPage.results.artist[0].displayName)

  res.json({ id });
});

router.post("/search", async (req, res) => {
  let bandInput = encodeURIComponent(`${req.body.text}`);
  const resSearch = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandInput}&api_key=${LastFmKey}&format=json`);
  const dataSearch = await resSearch.json();
  const resPic = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${bandInput}&key=${YouTubeKey}`);
  const pic = await resPic.json();
  const topTracksApiCall = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${bandInput}&api_key=${LastFmKey}&format=json`);

  dataSearch.topTracks = topTracksApiCall.data.toptracks.track.slice(0, 10);
  res.json({ dataSearch, pic })
});

router.get("/concert/:id", async (req, res) => {
  let concertId = req.params.id;
  const resConcertInfo = await fetch(`https://api.songkick.com/api/3.0/events/${concertId}.json?apikey=${SongKickKey}`);
  const ConcertInfo = await resConcertInfo.json();
  const info = ConcertInfo.resultsPage.results.event;

  const commentsConcert = await Concert.findOne({ idConcert: concertId });
  if (!commentsConcert) {
    res.json({ info, commentsConcert: [] });
  } else {
    res.json({ info, commentsConcert: commentsConcert.comments });
  }
});

router.post("/comments", async (req, res) => {
  let { nameArtists, idConcert, comments } = req.body.comment;

  const concert = await Concert.findOne({ idConcert });
  if (!concert) {
    const newConcert = new Concert({
      nameArtists: nameArtists,
      idConcert,
      comments: [comments],
      attendees: null,
      photos: null
    });
    await newConcert.save();
  } else {
    await Concert.updateOne(
      { idConcert: idConcert },
      { $push: { comments: [comments] } }
    );
  }
  const concerts = await Concert.findOne({ idConcert })
  res.json({ concerts });
});

router.get("/artists/:id", async (req, res) => {
  const bandId = req.params.id;
  const resConcerts = await fetch(
    `https://api.songkick.com/api/3.0/artists/${bandId}/calendar.json?apikey=${SongKickKey}&per_page=5`
  );
  const dataConcerts = await resConcerts.json();
  res.json({ dataConcerts });
});

router.get('/explore/:page', async (req, res) => {
  const page = req.params.page;
  console.log(page)
  const resExplore = await fetch(`https://api.songkick.com/api/3.0/metro_areas/32051/calendar.json?apikey=${SongKickKey}&page=${page}`);
  const dataExplore = await resExplore.json();
  console.log(dataExplore)
  res.json({ dataExplore })
});

router.post('/explore/:date', async (req, res) => {
  let date = req.body.formattedDate;
  const resDate = await fetch(`https://api.songkick.com/api/3.0/metro_areas/32051/calendar.json?apikey=${SongKickKey}&min_date=${date}&max_date=${date}`);
  const dataDate = await resDate.json();
  res.json({ dataDate })
});

module.exports = router;

var express = require("express");
const fetch = require("node-fetch");

const Concert = require("../models/concert");

require("dotenv").config();
var router = express.Router();
let SongKickKey = process.env.SONGKICK_KEY;
let LastFmKey = process.env.LASTFM_KEY;

router.post("/getId", async (req, res) => {
  let bandInput = req.body.text;
  const resID = await fetch(
    `https://api.songkick.com/api/3.0/search/artists.json?apikey=${SongKickKey}&query=${bandInput}`
  );
  const dataID = await resID.json();
  const id = dataID.resultsPage.results.artist[0].id;
  res.json({ id });
});

router.post("/search", async (req, res) => {
  let bandInput = req.body.text;
  const resSearch = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${bandInput}&api_key=${LastFmKey}&format=json`
  );
  const dataSearch = await resSearch.json();
  res.json({ dataSearch });
});

router.get("/concert/:id", async (req, res) => {
  let concertId = req.params.id;

  const resConcertInfo = await fetch(
    `https://api.songkick.com/api/3.0/events/${concertId}.json?apikey=${SongKickKey}`
  );
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


  // console.log(concertComments)
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

module.exports = router;

const express = require("express");

const router = express.Router();
const User = require('../models/users');


router.patch("/concert/previous/add/:id", async (req, res) => {
  const data = {
      concertId: req.params.id,
      group: req.body.data.eventName,
      date: req.body.data.eventDate,
      location: {lat: req.body.data.eventLocation.lat, lng: req.body.data.eventLocation.lng},
  }
  
  const user = await User.findById( req.body.data.userId );
  await user.previousConcerts.push(data);
  await user.save()
  req.session.user = user;
  res.json(user)
});


router.patch("/concert/upcoming/add/:id", async (req, res) => {
  const data = {
      concertId: req.params.id,
      group: req.body.data.eventName,
      date: req.body.data.eventDate,
      location: {lat: req.body.data.eventLocation.lat, lng: req.body.data.eventLocation.lng},
  }

  const user = await User.findById( req.body.data.userId );
  
  await user.upcomingConcerts.push(data);
  await user.save();
  req.session.user = user;
  res.json(user)
});


router.patch("/concert/upcoming/cancel/:id", async (req, res) => {
  
  const user = await User.findById( req.body.user );
  
  const index = await user.upcomingConcerts.findIndex((e) => {
    return e.concertId == req.params.id
  })
  await user.upcomingConcerts.splice(index, 1);
  await user.save();

  req.session.user = user;
  res.json(user)
});


router.patch("/artist/favorite/add/:id", async (req, res) => {

  const user = await User.findById( req.body.user );
  
  await user.favouriteGroups.push(req.params.id);  
  await user.save();
  req.session.user = user;
  
  res.json(user)
});

router.patch("/artist/favorite/remove/:id", async (req, res) => {
  
  console.log(req.body);
  
  const user = await User.findById( req.body.user );
  
  const index = await user.favouriteGroups.findIndex((e) => {
    return e == req.params.id
  })
  console.log(user);
  await user.favouriteGroups.splice(index, 1);
  await user.save();
  console.log(user);
  

  req.session.user = user;
  res.json(user)
});





module.exports = router;
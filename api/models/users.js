const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favouriteGroups: [],
  upcomingConcerts: [{concertId:String, group:String, date:Date, location: Object},],
  previousConcerts: [{concertId:String, group:String, date:Date, location: Object}, ],
  city: String,
  comments: [],
  recommendations: [],
  role: String,
  userPic: String
});

module.exports = mongoose.model("User", userSchema);
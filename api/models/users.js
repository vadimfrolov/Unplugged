const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favouriteGroups: [],
  upcomingConcerts: [{group:String, date:Date, location: String},],
  previousConcerts: [{group:String, date:Date, location: String}, ],
  city: String,
  comments: [],
  recommendations: [],
  role: String,
  userPic: String
});

module.exports = mongoose.model("User", userSchema);
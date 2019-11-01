const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favouriteGroups: [],
  upcomingConcerts: [],
  previousConcerts: [],
  city: String,
  comments: [],
  recommendations: [],
  role: String,
  userPic: ''
});

module.exports = mongoose.model("User", userSchema);
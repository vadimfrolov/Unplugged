const {model, Schema} = require('mongoose');

const userSchema = new Schema ({
  Username: String,
  Email: String,
  Password: String,
  Favourite:[],
  groupsNextConcerts: [],
  PreviousConcerts:[Object],
  City: String,
  Likesmusic: [],
  Comments:[Object],
  Recommendations:[],
  Role:String,
  Userpic:String,
})


module.exports = model('User', userSchema);
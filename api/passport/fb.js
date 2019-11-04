
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
module.exports = (passport) => {

  passport.use(new FacebookStrategy({
    clientID: 958510147863259,
    clientSecret: '72e52d6b6517fe86634ef2e6e8424636',
    callbackURL: "http://localhost:9000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  }, async (access_token, refresh_token, profile, done) => {

    // find the user in the database based on their facebook id
    const user = await User.findOne({ fb_id: profile.id })
    if (user) {
      return done(null, user); // user found, return that user
    } else {
      // if there is no user found with that facebook id, create them
      // console.log(profile);
      
      const newUser = new User(
        {
          fb_id: profile.id,
<<<<<<< HEAD
          Password: access_token,
          Username: profile.displayName,
          Email: profile.email
=======
          password: access_token,
          userName: profile.displayName,
          email: profile.email

>>>>>>> 87a53fb09606853a167d3fe2068bc6eeb16a7159
        })
      // save our user to the database
      await newUser.save(function (err) {
        if (err)
          throw err;
        return done(null, newUser);
      });
    }
  }));
};
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();
const User = require('../models/users');

const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

/* GET users listing. */

router.get("/getsession/", async (req, res) => {
  req.session.user ? res.json(req.session.user) : res.json(null);
});

router.put("/registration/", async (req, res) => {
  console.log(req.body.user);

  const chekEmail = User.findOne({ email: req.body.user.email });
  if (!chekEmail) {
    res.json({ error: "wrong email" });
  } else {
    const user = new User({
      username: req.body.user.username,
      email: req.body.user.email,
      password: req.body.user.password
    });
    await user.save();
    req.session.user = user;
    res.json(user);
  }
});



router.post('/login/', async (req, res) => {
  
  const user = await User.findOne({
    username: req.body.user.username
  });
  console.log(user);
  if (user.password === req.body.user.password) {
    req.session.user = user;
    res.json(user);
  } else {
    res.json({ eror: "wrong password" });
  }
});

router.get(
  "/login/facebook",
  passport.authenticate("facebook", { authType: "rerequest" })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    // Successful authentication, redirect home.
    res.json(user);
  }
);

router.patch("/update/", async (req, res) => {
  console.log(req.body.user);
  const user = await User.findOneAndUpdate(
    { _id: req.body.user._id },
    {
      username: req.body.user.username,
      City: req.body.user.City,
      Userpic: req.body.user.Userpic
    }
  );
  await user.save();
  res.json(user);
});

router.get("/logout/", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      req.session.user = null;
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.json({ status: "ok" });
  }
});

module.exports = router;

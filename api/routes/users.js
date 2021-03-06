const express = require("express");
const router = express.Router();

const User = require('../models/users');


router.get('/getsession/', async (req, res) => {
  req.session.user ? res.json(req.session.user) : res.json(null);
});

router.put("/registration/", async (req, res) => {
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
    req.session.user = user
    res.json(user);
  }
});

router.post('/login/', async (req, res) => {
  const user = await User.findOne({
    username: req.body.user.username
  });
  !user
  ? res.json({ error: 'wrong user' })
  : res.json(true);

  if (user && user.password === req.body.user.password) {
    req.session.user = user;
    res.json(req.session.user);
  } else {
    user
    ? res.json({ error: 'wrong user' })
    : res.json(true);      
  }
});

router.patch("/update/", async (req, res) => {
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
      res.send('ok')
    } catch (error) {
      next(error);
    }
  } else {
    res.json({ status: "ok" });
  }
});

module.exports = router;

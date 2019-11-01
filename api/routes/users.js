const express = require('express');
const bcrypt = require('bcrypt');


const router = express.Router();
const User = require('../moodels/user');

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

/* GET users listing. */

router.get('/getsession/', async (req, res) => {
  req.session.user ? res.json(req.session.user) : res.json(null);
})


router.post('/login/', async (req, res) => {
  const user = await User.findOne({
    Username: req.body.user.login,
  })

  if (user.Password === req.body.user.password) {
    req.session.user = user
    res.json(user);
  } else {
    res.json({eror:'wrong password'})
  }
});

router.post('/registration/', async (req, res) => {
  const chekEmail = User.findOne({ email: req.body.user.email })
  if (!chekEmail) {
    res.json({error:'wrong email'})
  } else {
    const user = new User({
      Username: req.body.user.login,
      Email: req.body.user.email,
      Password: req.body.user.password,
    })
    await user.save();
    req.session.user = user
    res.json(user);
  }
});

router.get('/logout/', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.json({status:'ok'});
  }
});


module.exports = router;
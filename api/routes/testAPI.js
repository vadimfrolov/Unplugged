var express = require("express");
var router = express.Router();
const User = require("../models/users");

router.get("/", async function(req, res, next) {
    // res.send("API is working properly");
    const currentUser = await User.find( {username:'Jonh Doe'})
    console.log(currentUser[0])
    res.json(currentUser[0]);
});

module.exports = router;
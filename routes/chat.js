const router = require("express").Router();

const chat = require('../controllers/chat');

const User = require("../models/User");

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
});

router.get("/", async (req, res) => {
  res.render("chat", {
    login: req.user,
    available: await User.find({login: {$nin: req.user}}).select("login -_id"),
  });
});

router.get("/room/:roomId", chat.room);
router.get("/room", chat.pm);

module.exports = router;

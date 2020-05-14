const router = require("express").Router();

const User = require("../models/User");
const Room = require("../models/Room");

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
    available: await User.find().select("login -_id"),
  });
});

router.get("/room/:roomId", async (req, res) => {
  const {
    params: { roomId },
    user
  } = req;

  const room = await Room.findOne({ _id: roomId });

  if (!room) {
    res.status(400).send("not ok");
  } else if (room.participants.indexOf(user) === -1) {
    res.status(400).send("not ok");
  }
  {
    res.render("PMchat", { messages: room.messages, user, participants: room.participants, roomId: room.id.toString()});
  }
});

router.get("/room", async (req, res) => {
  const {
    query: { login },
  } = req;

  const userLogin = req.user;

  const firstUser = await User.findOne({login: userLogin})
  const secondUser = await User.findOne({login})

  if(!(firstUser || secondUser)) {
      res.redirect('/');
      return;
  }

  const existingRoom = await Room.findOne({
    participants: { $all: [userLogin, login] },
    personal: true,
  });

  if (!existingRoom) {
    const room = new Room({participants: [userLogin, login], personal: true})
    room.save();
    res.render("PMchat", {user: userLogin, participants: room.participants, roomId: room.id.toString()})
  } else{
    res.render("PMchat", { messages: existingRoom.messages, user: userLogin, participants: existingRoom.participants, roomId: existingRoom.id.toString()});
  }
});

module.exports = router;

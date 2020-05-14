const router = require("express").Router();

/* GET home page. */

router.use("/chat", require("./chat"));

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/chat");
  } else {
    next();
  }
});

router.get("/", function (req, res, next) {
  res.render("main");
});

router.use("/auth", require("./users"));
module.exports = router;

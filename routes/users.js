const router = require("express").Router();

const user = require("../controllers/auth");

/* GET users listing. */
router.get("/reg", function (req, res, next) {
  res.render("registration");
});

router.post("/reg", user.signup);

router.post("/log", user.signin);

module.exports = router;

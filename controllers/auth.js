const passport = require("passport");

module.exports = {
  signup: passport.authenticate("local-signup", {
    successRedirect: "/chat",
    failureRedirect: "/auth/reg",
  }),
  signin: passport.authenticate("local-login", {
    successRedirect: "/chat",
    failureRedirect: "/",
  }),
};

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user.login);
  });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with login
      usernameField: "login",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    function (req, login, password, done) {
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function () {
        // find a user whose login is the same as the forms login
        // we are checking to see if the user trying to login already exists
        User.findOne({ login }, function (err, user) {
          // if there are any errors, return the error
          if (err) return done(err);

          // check to see if theres already a user with that login
          if (user) {
            return done(null, false, { error: "Login is already taken" });
          } else {
            // if there is no user with that login
            // create the user
            const newUser = new User();

            // set the user's local credentials
            newUser.login = login;
            newUser.password = password;

            // save the user
            newUser.save(function (err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "login",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    function (req, login, password, done) {
      // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ login }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err) return done(err);

        // if no user is found, return the message
        if (!user) return done(null, false, { error: "Wrong password/login" }); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.comparePassword(password))
          return done(null, false, { error: "Wrong password/login" }); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
      });
    }
  )
);

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, {
          message: "Incorrect User",
        });
      }
      if (user) {
        await bcrypt.compare(password, user.password, (req, res) => {
          // if (err) return done(err);
          if (res === false) {
            return done(null, false, {
              message: "Incorrect Password",
            });
          }
          return done(null, user);
        });
      }
    }
  )
);

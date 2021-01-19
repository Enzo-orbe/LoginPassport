const express = require("express");
const session = require("express-session");
const connectDB = require("./src/db");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./src/models/User");
const testingRoute = "./src/routes/prueba.js";
const app = express();

//Connect DB
connectDB();

//Middlewares
app.use(
  session({
    secret: "aplicationtesting",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new localStrategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "User doesn't exist" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        if (res === false) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
      });
    });
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/test");
}

app.use("/test", isLoggedIn, testingRoute);

//Start Server
app.listen("3001", () => {
  console.log("Server on Port 3001");
});

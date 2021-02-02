const express = require("express");
const session = require("express-session");
const connectDB = require("./src/db");
const passport = require("passport");
const cors = require("cors");
const userRoute = require("./src/routes/user.js");
const app = express();
const flash = require("connect-flash");
require("./src/auth");
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
app.use(cors());

//Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/user", userRoute);

function isLoggedIn(req, res, next) {
  console.log("paso por aca");
  if (req.isAuthenticated()) return next();
  else req.flash();
}

app.get("/", isLoggedIn, (req, res) => {
  res.send("Prueba Funcionando");
});

//Start Server
app.listen("3001", () => {
  console.log("Server on Port 3001");
});

const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express();

router.post("/register", async (req, res) => {
  const { name, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  try {
    if (!name || !lastName || !email || !password)
      return res.status(400).json({ msg: "All fields are required " });

    // async function hash(test) {
    //   return await bcrypt.hash(test, salt);
    // }

    const user = await User.create({
      name: name,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, salt),
    });

    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

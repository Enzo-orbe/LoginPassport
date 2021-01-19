const express = require("express");
const User = require("../models/User");
const router = express();

router.get("/", (req, res) => {
  res.json({ msg: " Funciona " });
});

module.export = router;

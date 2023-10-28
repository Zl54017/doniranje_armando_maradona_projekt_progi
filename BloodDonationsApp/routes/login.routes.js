var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const db = require("../models");
const Donor = require("../models/donor");
const BloodBank = require("../models/bloodbank");
const Action = require("../models/action");
const Certificate = require("../models/certificate");
const Donation = require("../models/donation");
const ActionRegistration = require("../models/actionregistration");

router.get("/", async (req, res, next) => {});

app.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  res.send(`Email: ${email} Password: ${password}`);
  const donor = await db.Donor.findOne({
    where: {
      email: req.session.email,
      password: req.session.password,
    },
  });
  if (donor) {
    req.session.email = email;
    req.session.password = password;
    res.redirect("/donor");
  } else {
    res.send(`Ne postoji donor s takvom kombinacijom!`);
  }
});

module.exports = router;

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

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const donor = await db.Donor.findOne({
    where: {
      email: req.session.email,
      password: req.session.password,
    },
  });
  if (donor) {
    req.session.email = email;
    req.session.password = password;
    res.json(donor);
  } else {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });

    if (bloodBank) {
      req.session.email = email;
      req.session.password = password;
      res.json(bloodBank);
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  }
});

module.exports = router;

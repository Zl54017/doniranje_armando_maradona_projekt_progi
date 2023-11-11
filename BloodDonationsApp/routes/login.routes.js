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
const Sequelize = require("sequelize");

router.get("/", async (req, res, next) => {});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const donor = await db.Donor.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (donor) {
    res.json(donor);
  } else {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (bloodBank) {
      res.json(bloodBank);
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  }
});

module.exports = router;

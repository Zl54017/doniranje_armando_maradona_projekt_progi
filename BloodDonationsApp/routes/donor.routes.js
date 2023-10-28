var express = require("express");
var router = express.Router();

const db = require("../models");
const Donor = require("../models/donor");
const BloodBank = require("../models/bloodbank");
const Action = require("../models/action");
const Certificate = require("../models/certificate");
const Donation = require("../models/donation");
const ActionRegistration = require("../models/actionregistration");

router.get("/", async (req, res, next) => {
  req.session.email = "emilywhite@example.com";
  req.session.password = "mysecret";
  if (req.session.email == undefined) {
    const bloodBanks = await db.BloodBank.findAll();
    const actions = await db.Action.findAll();
    res.send(
      `<h1>Vi ste gost, ovo su svi instituti i sve akcije</h1><pre>${JSON.stringify(
        bloodBanks,
        null,
        2
      )}</pre><pre>${JSON.stringify(actions, null, 2)}</pre>`
    );
  } else {
    const donor = await db.Donor.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });
    const donations = await donor.getDonations();

    res.send(
      `<h1>Hi ${donor.name}, these are your donations</h1><pre>${JSON.stringify(
        donations,
        null,
        2
      )}</pre>`
    );
  }
});

module.exports = router;

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

const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');

router.get("/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  if (decoded.role === "donor") {
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    res.json({
      user: donor,
      role: 'donor',
      token: req.params.token,
    })
  } else {
    res.status(404).json({
      message: "Decode failed"
    });
  }
});

router.post("/", async (req, res) => {
  const {
    email,
    password
  } = req.body;

  const donor = await db.Donor.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (donor) {
    const data = {
      id: donor.id,
      email: donor.email,
      role: 'donor'
    }
    const token = jwt.sign(data, 'progi123');

    res.json({
      user: donor,
      role: 'donor',
      token: token,
    })
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
      res.status(401).json({
        message: "Login failed"
      });
    }
  }
});

module.exports = router;
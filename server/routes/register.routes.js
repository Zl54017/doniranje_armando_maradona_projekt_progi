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

const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

router.get("/", async (req, res, next) => {});

/**
 * Create a new donor.
 * Checks if donor with given email already exists.
 */
router.post("/", async (req, res) => {
  const { name, email, password, bloodType, transfusionInstitute } = req.body;

  try {
    const existingDonor = await db.Donor.findOne({
      where: {
        email: email,
      },
    });

    if (existingDonor) {
      return res
        .status(401)
        .json({ message: "Donor with email already exists" });
    }

    const donor = await db.Donor.create({
      name: name,
      email: email,
      password: password,
      bloodType: bloodType,
      transfusionInstitute: transfusionInstitute,
      numberOfDonations: 0,
    });

    const data = {
      id: donor.id,
      email: donor.email,
      role: "donor",
    };

    const token = jwt.sign(data, "progi123");

    res.json({
      user: donor,
      role: "donor",
      token: token,
    });
  } catch (error) {
    console.error("Error creating donor:", error);
    res.status(500).json({ message: "Error creating donor" });
  }
});

module.exports = router;

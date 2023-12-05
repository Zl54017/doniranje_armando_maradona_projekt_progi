var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const crypto = require("crypto");

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
  const { firstName, lastName, email, password, bloodType, transfusionInstitute } = req.body;

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

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
      name: firstName+lastName,
      email: email,
      password: hashedPassword,
      bloodType: bloodType,
      transfusionInstitute: transfusionInstitute,
      numberOfDonations: 0,
    });

    await db.BloodBank.update(
      { numberOfDonors: db.sequelize.literal('"numberOfDonors" + 1') },
      {
        where: {
          name: transfusionInstitute,
        },
      }
    );

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

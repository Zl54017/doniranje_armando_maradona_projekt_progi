var express = require("express");
var router = express.Router();

const db = require("../models");
const Donor = require("../models/donor");
const BloodBank = require("../models/bloodbank");
const Action = require("../models/action");
const Certificate = require("../models/certificate");
const Donation = require("../models/donation");
const ActionRegistration = require("../models/actionregistration");
const Sequelize = require("sequelize");

/**
 * Handle the GET request to retrieve a donor's donations.
 */
router.get("/donations", async (req, res, next) => {
  try {
    const donor = await db.Donor.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });
    const donations = await donor.getDonations();

    res.json(donations);
  } catch (error) {
    console.error("Error retrieving donations:", error);
    res.status(500).json({ error: "Failed to retrieve donations" });
  }
});

/**
 * Handle the GET request to retrieve all actions from donor's institute.
 */
router.get("/actions", async (req, res, next) => {
  try {
    const donor = await db.Donor.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });
    const bloodBank = await donor.getBloodBank();
    const currentDateTime = new Date();

    const actions = await bloodBank.getActions({
      where: {
        date: {
          [db.Sequelize.Op.gt]: currentDateTime, // Use the greater than operator
        },
      },
    });
    res.json(actions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve actions" });
  }
});

/**
 * Handle the GET request to retrieve all actions.
 */
router.get("/allActions", async (req, res, next) => {
  try {
    const currentDateTime = new Date();
    const actions = await db.Action.findAll({
      where: {
        date: {
          [db.Sequelize.Op.gt]: currentDateTime, // Use the greater than operator
        },
      },
    });
    res.json(actions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve actions" });
  }
});

/**
 * Handle the POST request for action registration.
 * Creates a new action registration and returns a response.
 */
router.post("/actionRegistration", async (req, res, next) => {
  try {
    const { actionId, donorId } = req.body;
    const newAction = await db.Action.create({
      actionId: actionId,
      donorId: donorId,
    });
    res.json({ message: "New Action created", data: newAction.toJSON() });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new Action" });
  }
});

/**
 * Example, should be removed
 */
router.get("/", async (req, res, next) => {
  //req.session.email = "emilywhite@example.com";
  req.session.password = "mysecret";
  if (req.session.email == undefined) {
    const currentDateTime = new Date();
    const bloodBanks = await db.BloodBank.findAll();
    const actions = await db.Action.findAll({
      where: {
        date: {
          [db.Sequelize.Op.gt]: currentDateTime, // Use the greater than operator
        },
      },
    });
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

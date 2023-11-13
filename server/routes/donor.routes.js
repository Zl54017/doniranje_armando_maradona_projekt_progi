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
 * Handle the POST request to retrieve a donor's donations.
 */
router.post("/donations", async (req, res, next) => {
  try {
    console.log(req.body);
    const donor = await db.Donor.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    const donations = await donor.getDonations();

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve donations" });
  }
});

/**
 * Handle the POST request to retrieve all actions from donor's institute.
 */
router.post("/actions", async (req, res, next) => {
  try {
    const donor = await db.Donor.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
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
    console.log(error);
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
    console.log(error);
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
    const newActionRegistration = await db.ActionRegistration.create({
      actionId: actionId,
      donorId: donorId,
    });
    res.json({
      message: "New Action Registration created",
      data: newActionRegistration.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create a new Action Registration" });
  }
});

module.exports = router;

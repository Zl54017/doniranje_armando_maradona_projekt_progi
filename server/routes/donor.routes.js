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

const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

/**
 * Handle the POST request to retrieve a donor's donations.
 */
router.post("/donations/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    console.log(req.body);
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    const donations = await donor.getDonations();

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve donations" });
  }
});

router.post("/lastDonationDays/:token", async (req, res, next) => {
  try {
    const decodedToken = decode.jwtDecode(req.params.token);

    const donor = await db.Donor.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    const donations = await donor.getDonations({
      order: [["date", "DESC"]],
    });

    if (!donations || donations.length === 0) {
      return res.json({ daysSinceLastDonation: 0 });
    }

    const today = new Date();
    const lastDonationDate = new Date(donations[0].date);
    const daysSinceLastDonation = Math.floor(
      (today - lastDonationDate) / (1000 * 60 * 60 * 24)
    );

    res.json({ daysSinceLastDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve donations" });
  }
});

/**
 * Handle the POST request to retrieve all actions from donor's institute.
 */
router.post("/actions/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
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
router.post("/actionRegistration/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const { actionId } = req.body;
    const newActionRegistration = await db.ActionRegistration.create({
      actionId: actionId,
      donorId: decoded.id,
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

/**
 * Handle the POST request to retrieve inventory of blood
 */
router.post("/bloodBanksInventory/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBanks = await db.BloodBank.findAll({});
    const inventory = {};

    for (const bloodBank of bloodBanks) {
      const results = await db.Donation.findAll({
        attributes: [
          [Sequelize.literal('"donor"."bloodType"'), "bloodType"],
          [Sequelize.literal("0.5 * COUNT(*)"), "donationCount"],
        ],
        include: [
          {
            model: db.Donor,
            as: "donor",
            attributes: [],
            where: {
              transfusionInstitute: bloodBank.name,
            },
          },
        ],
        where: {
          used: false,
          warning: "",
          bloodBankId: bloodBank.id,
        },
        group: ["donor.bloodType"],
      });

      const bloodTypeCounts = {};
      results.forEach((result) => {
        bloodTypeCounts[result.dataValues.bloodType] = parseFloat(
          result.dataValues.donationCount
        );
      });

      inventory[bloodBank.name] = bloodTypeCounts;
    }

    res.json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve inventory" });
  }
});

//funkcija kojom donor može provjeriti zalihu krvi njegove krvne grupe u svakom zavodu (na svakoj lokaciji) kako bi znao gdje ima najmanje krvi pa tamo išao donirati
router.post("/bloodBankInventory/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    const bloodType = donor.bloodType;

    //lista lokacija (treba ju na kraju updateati s stvarnim lokacijama)
    const bloodBankLocations = ['Location1', 'Location2', 'Location3', 'Location4', 'Location5']; 

    const inventory = {};

    for (const location of bloodBankLocations) {
      const bloodBank = await db.BloodBank.findOne({
        where: {
          name: location,
        },
      });

      const result = await db.Donation.findAll({
        attributes: [
          [Sequelize.literal('"donor"."bloodType"'), "bloodType"],
          [Sequelize.literal("0.5 * COUNT(*)"), "donationCount"],
        ],
        include: [
          {
            model: db.Donor,
            as: "donor",
            attributes: [],
            where: {
              transfusionInstitute: bloodBank.name,
              bloodType: bloodType,
            },
          },
        ],
        where: {
          used: false,
        },
        group: ["donor.bloodType"],
      });

      if (result.length > 0) {
        inventory[location] = parseFloat(result[0].dataValues.donationCount);
      } else {
        inventory[location] = 0;
      }
    }

    res.json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve blood bank inventory" });
  }
});

module.exports = router;

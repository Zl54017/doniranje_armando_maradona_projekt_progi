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

router.get("/", async (req, res, next) => {});

/**
 * Handle the GET request to retrieve inventory of blood
 */
router.get("/inventory", async (req, res, next) => {
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });

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
      },
      group: ["donor.bloodType"],
    });

    const table = {};
    results.forEach((result) => {
      table[result.dataValues.bloodType] = parseFloat(
        result.dataValues.donationCount
      );
    });
    res.json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve invntory" });
  }
});

module.exports = router;

/*prijedlog: u tablicu donacije dodati stupac "used",
 * ako je "true" krv je iskorištena,
 * a ako "false" krv je na zalihi,
 *također ako postoji upozorenje krv nećemo ubrojiti u zalihu
 */

/*prijedlog fja:
 * get za zalihu krvi npr. "A+"
 * post za potvrditi dolazak donora na akciju
 * get za dobiti registracije na određenu akciju
 * post za uzeti odredeni broj litara krvi sa zalihe, uzimaju se prvo stariji
 * ...
 */

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


//funkcija za dohvatiti zalihu krvi određene krvne grupe
router.get("/inventory/:bloodType", async (req, res, next) => {
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });

    const bloodType = req.params.bloodType;

    const result = await db.Donation.findAll({
      where: {
        used: false,
      },
      include: [
        {
          model: db.Donor,
          as: "donor",
          where: {
            transfusionInstitute: bloodBank.name,
            bloodType: bloodType,
          },
        },
      ],
    });

    // Račun za ukupnu količinu krvi u litrama
    let totalBloodQuantity = result.reduce((total, donation) => {
      return total + 0.5; // Svaka donacija je 0.5 litara
    }, 0);

    res.json({ bloodType, quantityInLiters: totalBloodQuantity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve blood inventory" });
  }
});


//funkcija za uzeti određenu količinu krvi neke krvne grupe
router.post("/takeBlood/:bloodType/:quantityToTake", async (req, res, next) => {
  try {
    const bloodType = req.params.bloodType;
    const quantityToTake = parseFloat(req.params.quantityToTake);

    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.session.email,
        password: req.session.password,
      },
    });

    // Pronađi starije donacije koje odgovaraju traženoj krvnoj grupi i nisu već iskorištene, sortirane po datumu
    const olderDonations = await db.Donation.findAll({
      where: {
        used: false,
        '$donor.bloodType$': bloodType, // Tražena krvna grupa
        '$donor.transfusionInstitute$': bloodBank.name, // Banka krvi
      },
      include: [
        {
          model: db.Donor,
          as: "donor",
        },
      ],
      order: [['date', 'ASC']], // Sortiraj prema atributu "date" (od najstarije prema najnovijoj)
    });

    // Izračunaj ukupnu dostupnu količinu krvi
    let availableQuantity = olderDonations.length * 0.5; // Svaka donacija je 0.5 litara

    if (availableQuantity >= quantityToTake) {
      // Ako ima dovoljno krvi, ažuriraj stanje zalihe i označi donacije kao iskorištene
      let quantityTaken = 0;

      for (const donation of olderDonations) {
        if (quantityTaken < quantityToTake) {
          const remainingQuantity = quantityToTake - quantityTaken;
          if (0.5 <= remainingQuantity) {
            // Cijela donacija je potrošena
            donation.used = true;
            donation.save();
            quantityTaken += 0.5;
          } else {
            // Samo dio donacije je potrošen
            quantityTaken = quantityToTake;
          }
        }
      }

      res.json({ success: true, message: `Uspješno je uzeto ${quantityToTake} litara krvi (${bloodType}).` });
    } else {
      res.status(400).json({ error: `Nedovoljna količina krvi (${bloodType}) na zalihama.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greška pri uzimanju krvi iz zalihe." });
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

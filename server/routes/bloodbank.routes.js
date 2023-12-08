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

router.get("/", async (req, res, next) => {});

/**
 * Handle the POST request to retrieve inventory of blood
 */
router.post("/inventory/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
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
    res.status(500).json({ error: "Failed to retrieve inventory" });
  }
});

//funkcija za dohvatiti zalihu krvi određene krvne grupe
router.get("/inventory/:bloodType", async (req, res, next) => {
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
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
        email: req.body.email,
        password: req.body.password,
      },
    });

    // Pronađi starije donacije koje odgovaraju traženoj krvnoj grupi i nisu već iskorištene, sortirane po datumu
    const olderDonations = await db.Donation.findAll({
      where: {
        used: false,
        "$donor.bloodType$": bloodType, // Tražena krvna grupa
        "$donor.transfusionInstitute$": bloodBank.name, // Banka krvi
      },
      include: [
        {
          model: db.Donor,
          as: "donor",
        },
      ],
      order: [["date", "ASC"]], // Sortiraj prema atributu "date" (od najstarije prema najnovijoj)
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

      res.json({
        success: true,
        message: `Uspješno je uzeto ${quantityToTake} litara krvi (${bloodType}).`,
      });
    } else {
      res.status(400).json({
        error: `Nedovoljna količina krvi (${bloodType}) na zalihama.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Greška pri uzimanju krvi iz zalihe." });
  }
});

//funkcija za slanje pozivnica donatorima ovisno o manjku pojedine krvne grupe
router.post("/sendInvitations/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    // Dohvati sve krvne grupe koje imaju manje od 10 litara zaliha
    const lowInventoryBloodTypes = await db.Donation.findAll({
      attributes: [
        [Sequelize.literal('"donor"."bloodType"'), "bloodType"],
        [Sequelize.literal("0.5 * COUNT(*)"), "totalQuantity"],
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
      having: Sequelize.literal("totalQuantity < 10"),
    });

    // Dohvati donatore za svaku krvnu grupu s manje od 10 litara zaliha
    const donorsToInvite = await db.Donor.findAll({
      where: {
        bloodType: lowInventoryBloodTypes.map(
          (item) => item.dataValues.bloodType
        ),
      },
    });

    // Treba još implementirati sustav/kanal preko kojega slati pozivnice (e-mail, SMS...)

    res.json({ success: true, message: "Invitations sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send invitations" });
  }
});

//funkcija za izdavanje potvrde donatoru
router.post("/issueCertificate/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const { donorId, date } = req.body;

    // Provjeri je li donacija već zabilježena za određenog donatora i datum
    const existingDonation = await db.Donation.findOne({
      where: {
        donorId: donorId,
        date: date,
      },
    });

    if (!existingDonation) {
      res.status(400).json({
        error: "Donation not found for the specified donor and date.",
      });
      return;
    }

    // Provjeri je li potvrda već izdana
    if (existingDonation.used) {
      res
        .status(400)
        .json({ error: "Certificate already issued for this donation." });
      return;
    }

    // Označi donaciju kao iskorištenu
    existingDonation.used = true;
    await existingDonation.save();

    // Kreiranje potvrdu
    const newCertificate = await db.Certificate.create({
      date: date,
      donorId: donorId,
      bloodBankId: bloodBank.id,
    });

    res.json(newCertificate.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to issue certificate" });
  }
});

/**
 * Handle the POST request to add a donation.
 */
router.post("/addDonation/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        id: decoded.id,
      },
    });

    const { donorId, warning, date, address } = req.body;

    const newDonation = await db.Donation.create({
      date: date,
      address: address,
      warning: warning,
      donorId: donorId,
      bloodBankId: bloodBank.id,
      used: false,
    });

    await db.Donor.update(
      { numberOfDonations: db.sequelize.literal('"numberOfDonations" + 1') },
      {
        where: {
          id: donorId,
        },
      }
    );

    res.json(newDonation.toJSON());
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add donation" });
  }
});

/**
 * Handle the POST request to see all registrations for an action.
 */
router.post("/registrations", async (req, res, next) => {
  try {
    const { actionId } = req.body;

    const registrations = await db.ActionRegistration.findAll({
      where: {
        actionId: actionId,
      },
    });

    res.json(registrations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve registrations" });
  }
});

/**
 * Handle the GET request to retrieve all blood banks for selection (id and names).
 */
router.get("/allBloodBanks", async (req, res, next) => {
  try {
    const bloodbanks = await db.BloodBank.findAll({
      attributes: ["id", "name"],
    });

    const bloodbankDictionary = bloodbanks.reduce((acc, bloodbank) => {
      acc[bloodbank.id] = bloodbank.name;
      return acc;
    }, {});

    res.json(bloodbankDictionary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve blood banks" });
  }
});

module.exports = router;

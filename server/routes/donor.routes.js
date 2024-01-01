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
const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index');
const certificate = require("../models/certificate");

/**
 * Handle the POST request for deleting a donor.
 * Adds the word "archived" to the donor's email.
 */
router.post("/delete/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    console.log(req.body);
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    // Add the word "archived" to the donor's email
    const archivedEmail = `${donor.email} (archived)`;

    // Update the donor's email in the database
    await donor.update({
      email: archivedEmail,
    });

    res.json({
      message: "Donor successfully archived"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to archive donor"
    });
  }
});

/**
 * Handle the POST request to retrieve a donor's donations.
 * Returns a list of donations.
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
    res.status(500).json({
      error: "Failed to retrieve donations"
    });
  }
});

/**
 * Handle the POST request to retrieve the number of days since the donors last donation.
 * Returns the number of days since the donors last donation
 */
router.post("/lastDonationDays/:token", async (req, res, next) => {
  try {
    const decodedToken = decode.jwtDecode(req.params.token);

    const donor = await db.Donor.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    if (!donor) {
      return res.status(404).json({
        error: "Donor not found"
      });
    }

    const donations = await donor.getDonations({
      order: [
        ["date", "DESC"]
      ],
    });

    if (!donations || donations.length === 0) {
      return res.json({
        daysSinceLastDonation: 0
      });
    }

    const today = new Date();
    const lastDonationDate = new Date(donations[0].date);
    const daysSinceLastDonation = Math.floor(
      (today - lastDonationDate) / (1000 * 60 * 60 * 24)
    );

    res.json({
      daysSinceLastDonation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve donations"
    });
  }
});

/**
 * Handle the GET request to retrieve the number of days the donor has to wait until another donation.
 * Returns the number of days until the donor can donate again
 */
router.get("/daysUntilNextDonation/:token", async (req, res, next) => {
  try {
    const decodedToken = decode.jwtDecode(req.params.token);

    const donor = await db.Donor.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    if (!donor) {
      return res.status(404).json({
        error: "Donor not found"
      });
    }

    const donations = await donor.getDonations({
      order: [
        ["date", "DESC"]
      ],
    });

    if (!donations || donations.length === 0) {
      return res.json({
        daysUntilNextDonation: 0
      });
    }

    const today = new Date();
    const lastDonationDate = new Date(donations[0].date);
    const daysSinceLastDonation = Math.floor(
      (today - lastDonationDate) / (1000 * 60 * 60 * 24)
    );
    const gender = donor.gender;

    var daysUntilNextDonation = 0;

    if (gender == "M") {
      if (daysSinceLastDonation < 90) {
        daysUntilNextDonation = 90 - daysSinceLastDonation;
      }
    } else if (gender == "F") {
      if (daysSinceLastDonation < 120) {
        daysUntilNextDonation = 120 - daysSinceLastDonation;
      }
    } else {
      res.status(500).json({
        error: "Failed to retrieve donors gender"
      });
    }

    res.json({
      daysUntilNextDonation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve donation information"
    });
  }
});

/**
 * Handle the POST request to retrieve all actions from donor's institute.
 * Returns a list of actions.
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
    res.status(500).json({
      error: "Failed to retrieve actions"
    });
  }
});

/**
 * Handle the GET request to retrieve all actions.
 * Returns a list of actions.
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
    res.status(500).json({
      error: "Failed to retrieve actions"
    });
  }
});

/**
 * Handle the POST request for action registration.
 * Creates a new action registration and returns a response.
 */
router.post("/actionRegistration/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const {
      actionId
    } = req.body;
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
      .json({
        error: "Failed to create a new Action Registration"
      });
  }
});

/**
 * Handle the POST request to retrieve inventory of blood of all blood types in all blood banks.
 * Returns a list of blood banks and their inventory.
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
        include: [{
          model: db.Donor,
          as: "donor",
          attributes: [],
        }, ],
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
    res.status(500).json({
      error: "Failed to retrieve inventory"
    });
  }
});

/**
 * Handle the GET request to retrieve inventory of blood of the donors blood type in all blood banks.
 * Returns a number of liters of blood.
 */
router.get("/inventoryOfBloodType/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    const bloodBanks = await db.BloodBank.findAll({});
    var inventory = 0;

    for (const bloodBank of bloodBanks) {
      const results = await db.Donation.findAll({
        attributes: [
          [Sequelize.literal('"donor"."bloodType"'), "bloodType"],
          [Sequelize.literal("0.5 * COUNT(*)"), "donationCount"],
        ],
        include: [{
          model: db.Donor,
          as: "donor",
          attributes: [],
        }, ],
        where: {
          used: false,
          warning: "",
          bloodBankId: bloodBank.id,
        },
        group: ["donor.bloodType"],
      });

      results.forEach((result) => {
        if (result.dataValues.bloodType == donor.bloodType) {
          inventory += parseFloat(result.dataValues.donationCount);
        }
      });
    }

    res.json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to retrieve inventory"
    });
  }
});

router.post("/change/:token", async (req, res) => {
  const decoded = decode.jwtDecode(req.params.token);
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    bloodType,
    transfusionInstitute,
  } = req.body;

  var hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (password.length == 64) hashedPassword = password;

  try {
    const existingDonor = await db.Donor.findOne({
      where: {
        email: email,
      },
    });

    if (existingDonor && existingDonor.id !== decoded.id) {
      return res
        .status(401)
        .json({
          message: "Donor with email already exists"
        });
    }

    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    // Update donor fields
    donor.name = firstName + " " + lastName;
    donor.email = email;
    donor.password = hashedPassword;
    donor.age = age;
    donor.gender = gender;
    donor.bloodType = bloodType;
    donor.transfusionInstitute = transfusionInstitute;

    // Save the changes
    await donor.save();

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
    console.error("Error changing donor: ", error);
    res.status(500).json({
      message: "Error changing donor"
    });
  }
});


router.post("/awards/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    console.log(req.body);
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    const certificates = await donor.getCertificates();



    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve certificates"
    });
  }
});

// novi dio, izbrisat ako ne bude ni posli radilo
router.post("/create-pdf/:token", async (req, res) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    console.log(req.body);
    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    const certificates = await donor.getCertificates();

    await new Promise((resolve, reject) => {
      pdf.create(pdfTemplate(donor.name, certificates[0].name, certificates[0].benefits, certificates[0].createdAt), {}).toFile('result.pdf', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });


    res.send(Promise.resolve());


  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve certificates"
    });
  }

});

router.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
  console.log("odi san")
})

module.exports = router;
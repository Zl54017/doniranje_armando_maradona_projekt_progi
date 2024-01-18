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

const pdf = require("html-pdf");
const pdfTemplate = require("../documents/index");
const certificate = require("../models/certificate");

/**
 * Handle the POST request for deleting a donor.
 * Adds the word "archived" to the donor's email.
 *
 * Returns an error if the donor is not found.
 * Returns a success message if the donor is successfully archived.
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

    const archivedEmail = `${donor.email} (archived)`;

    await donor.update({
      email: archivedEmail,
    });

    res.json({
      message: "Donor successfully archived",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to archive donor",
    });
  }
});

/**
 * Handle the POST request to retrieve a donor's donations.
 * Returns a list of donations.
 * Returns an error if the donor is not found.
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
      error: "Failed to retrieve donations",
    });
  }
});

/**
 * Handle the POST request to retrieve the number of days since the donors last donation.
 * Returns the number of days since the donors last donation.
 * Returns an error if the donor is not found.
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
        error: "Donor not found",
      });
    }

    const donations = await donor.getDonations({
      order: [["date", "DESC"]],
    });

    if (!donations || donations.length === 0) {
      return res.json({
        daysSinceLastDonation: 0,
      });
    }

    const today = new Date();
    const lastDonationDate = new Date(donations[0].date);
    const daysSinceLastDonation = Math.floor(
      (today - lastDonationDate) / (1000 * 60 * 60 * 24)
    );

    res.json({
      daysSinceLastDonation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve donations",
    });
  }
});

/**
 * Handle the GET request to retrieve the number of days the donor has to wait until another donation.
 * Returns the number of days until the donor can donate again.
 * Returns an error if the donor is not found.
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
        error: "Donor not found",
      });
    }

    const donations = await donor.getDonations({
      order: [["date", "DESC"]],
    });

    if (!donations || donations.length === 0) {
      return res.json({
        daysUntilNextDonation: 0,
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
        error: "Failed to retrieve donors gender",
      });
    }

    res.json({
      daysUntilNextDonation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve donation information",
    });
  }
});

/**
 * Handle the POST request to retrieve all actions from donor's institute.
 * Returns a list of actions.
 * Returns an error if the donor is not found.
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
      error: "Failed to retrieve actions",
    });
  }
});

/**
 * Handle the GET request to retrieve all actions for a specific blood bank.
 * Returns a list of actions.
 * Returns an error if the blood bank is not found.
 */
router.get("/allActions/:bloodBankName", async (req, res, next) => {
  const { bloodBankName } = req.params;

  try {
    const bloodBank = await db.BloodBank.findOne({
      where: {
        name: bloodBankName,
      },
    });

    if (!bloodBank) {
      return res.status(404).json({ error: "Blood bank not found" });
    }

    const currentDateTime = new Date();

    const bloodBankId = bloodBank.id;

    const actions = await db.Action.findAll({
      where: {
        bloodBankId: bloodBankId,
        date: {
          [db.Sequelize.Op.gt]: currentDateTime,
        },
      },
    });

    res.json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to retrieve actions",
    });
  }
});

/**
 * Handle the POST request for action registration.
 * Creates a new action registration and returns a response.
 * Checks if the donor is already registered for the action.
 * Checks if there is enough time between the last donation and the action.
 * Checks if there is enough time between the actions.
 * Returns an error if the donor is not found.
 * Returns an error if the action is not found.
 * Returns a success message if the donor is successfully registered for the action.
 */
router.post("/actionRegistration/:token", async (req, res, next) => {
  const decoded = decode.jwtDecode(req.params.token);
  try {
    const { actionId } = req.body;

    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    const action = await db.Action.findOne({
      where: {
        id: actionId,
      },
    });

    if (action.date < new Date()) {
      return res.json({
        title: "Neuspješna prijava",
        text: "Akcija je već prošla.",
      });
    }

    const lastDonationDate = await db.Donation.findOne({
      where: {
        donorId: decoded.id,
      },
      order: [["date", "DESC"]],
    });

    if (lastDonationDate) {
      const daysBetweenDonationAndAction = Math.floor(
        (action.date - lastDonationDate.date) / (1000 * 60 * 60 * 24)
      );

      if (donor.gender == "M") {
        if (daysBetweenDonationAndAction < 90) {
          return res.json({
            title: "Neuspješna prijava",
            text: "Davatelj krvi treba pričekati 90 dana nakon zadnje donacije.",
          });
        }
      } else if (donor.gender == "F") {
        if (daysBetweenDonationAndAction < 120) {
          return res.json({
            title: "Neuspješna prijava",
            text: "Davatelj krvi treba pričekati 120 dana nakon zadnje donacije.",
          });
        }
      }
    }

    const existingActionRegistration = await db.ActionRegistration.findOne({
      where: {
        actionId: actionId,
        donorId: decoded.id,
      },
    });

    if (existingActionRegistration) {
      return res.json({
        title: "Neuspješna prijava",
        text: "Već ste prijavljeni na ovu akciju.",
      });
    }

    const existingRegisteredActions = await db.Action.findAll({
      include: [
        {
          model: db.ActionRegistration,
          where: {
            donorId: decoded.id,
          },
        },
      ],
      where: {
        date: {
          [db.Sequelize.Op.gte]: new Date(),
        },
      },
    });

    var minDaysBetweenActions = 200;
    for (const existingRegisteredAction of existingRegisteredActions) {
      const daysBetweenActions = Math.floor(
        Math.abs(action.date - existingRegisteredAction.date) /
          (1000 * 60 * 60 * 24)
      );

      if (daysBetweenActions < minDaysBetweenActions) {
        minDaysBetweenActions = daysBetweenActions;
      }
    }

    if (donor.gender == "M") {
      if (minDaysBetweenActions < 90) {
        return res.json({
          title: "Neuspješna prijava",
          text: "Davatelj krvi treba pričekati 90 dana između akcija.",
        });
      }
    } else if (donor.gender == "F") {
      if (minDaysBetweenActions < 120) {
        return res.json({
          title: "Neuspješna prijava",
          text: "Davatelj krvi treba pričekati 120 dana između akcija.",
        });
      }
    }

    const newActionRegistration = await db.ActionRegistration.create({
      actionId: actionId,
      donorId: decoded.id,
    });
    res.json({
      title: "Uspješna prijava",
      text: "Uspješno ste se prijavili na akciju.",
      data: newActionRegistration.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to create a new Action Registration",
    });
  }
});

/**
 * Handle the POST request to retrieve inventory of blood of all blood types in all blood banks.
 * Returns a list of blood banks and their inventory.
 * Returns an error if failed to retrieve inventory.
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
    res.status(500).json({
      error: "Failed to retrieve inventory",
    });
  }
});

/**
 * Handle the GET request to retrieve inventory of blood of the donors blood type in all blood banks.
 * Returns a number of liters of blood.
 * Returns an error if failed to retrieve inventory.
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
        include: [
          {
            model: db.Donor,
            as: "donor",
            attributes: [],
          },
        ],
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
      error: "Failed to retrieve inventory",
    });
  }
});

/**
 * Handle the POST request to change the donor's information.
 * Returns the updated donor.
 * Returns an error if the donor is not found.
 * Returns an error if the donor with the new email already exists.
 */
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
      return res.status(401).json({
        message: "Donor with email already exists",
      });
    }

    const donor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found",
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
      message: "Error changing donor",
    });
  }
});

/**
 * Handle the POST request for changing the donor's password.
 * Checks if the old password is correct.
 * Checks if the new passwords match.
 * Returns an error if the donor is not found.
 */
router.post("/changePassword/:token", async (req, res) => {
  const decoded = decode.jwtDecode(req.params.token);
  const { oldPassword, newPassword1, newPassword2 } = req.body;

  var hashedPassword = crypto
    .createHash("sha256")
    .update(oldPassword)
    .digest("hex");

  try {
    const existingDonor = await db.Donor.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (existingDonor && existingDonor.password !== hashedPassword) {
      return res.json({
        message: "Neispravna lozinka",
      });
    }

    if (newPassword1 !== newPassword2) {
      return res.json({
        message: "Nove lozinke se ne podudaraju",
      });
    }

    var newHashedPassword = crypto
      .createHash("sha256")
      .update(newPassword1)
      .digest("hex");

    existingDonor.password = newHashedPassword;

    await existingDonor.save();

    res.json({
      message: "Lozinka uspješno promjenjena",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error changing password" + error,
    });
  }
});

/**
 * Handle the POST for retrieving the donor's certificates.
 * Returns a list of certificates.
 * Returns an error if the donor is not found.
 */
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
      error: "Failed to retrieve certificates",
    });
  }
});

module.exports = router;

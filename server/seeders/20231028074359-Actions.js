"use strict";
const db = require("../models");
const BloodBank = require("../models/bloodbank");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all blood banks from the database
    const bloodBanks = await db.BloodBank.findAll();

    const actions = [];

    // Specify a common address, date, and minNumberOfDonors for all actions
    const commonAddress = "Common Address";
    const commonDate = new Date(); // Set to the desired date
    commonDate.setMonth(commonDate.getMonth() + 5);
    const commonMinNumberOfDonors = 10; // Set to the desired value

    // Create one action for each blood bank
    bloodBanks.forEach((bloodBank) => {
      actions.push({
        bloodBankId: bloodBank.id,
        address: commonAddress,
        date: commonDate,
        minNumberOfDonors: commonMinNumberOfDonors,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Insert the action data into the database
    return queryInterface.bulkInsert("Actions", actions);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("Actions", null, {});
  },
};

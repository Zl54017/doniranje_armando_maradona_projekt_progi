"use strict";
const db = require("../models");
const Donor = require("../models/donor");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the names of the institutes
    const instituteNames = [
      "KBC Osijek",
      "KBC Rijeka",
      "KBC Split",
      "OB Dubrovnik",
      "OB Varaždin",
      "OB Zadar",
      "Hrvatski zavod za transfuzijsku medicinu Zagreb",
    ];

    const bloodBanks = [];

    for (const instituteName of instituteNames) {
      // Count the number of donors associated with the institute
      const numberOfDonors = await db.Donor.count({
        where: { transfusionInstitute: instituteName },
      });

      bloodBanks.push({
        name: instituteName, // Replace with the city name
        address: instituteName, // Replace with the address
        numberOfDonors: numberOfDonors,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert the blood bank data into the database
    return queryInterface.bulkInsert("BloodBanks", bloodBanks);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("BloodBanks", null, {});
  },
};
